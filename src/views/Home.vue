<template>
  <div id="app">
    <TopBar @create="createCommand" @close="close"/>
    <div class="body">
      <div class="camera">
        <div class="controls">
          <button @click="startCamera">New</button>
          <button @click="joinStream">Join</button>
        </div>
        <video ref="output" autoplay playsinline/>
      </div>
      <div class="commander">
        <div class="control">
          <div class="line">
            <Button label="↑" value="000"/>
          </div>
          <div class="line">
            <Button label="←" value="002"/>
            <Button label="■" value="004"/>
            <Button label="→" value="003"/>
          </div>
          <div class="line">
            <Button label="↓" value="001"/>
          </div>
        </div>
        <Button
          v-for="command in commands"
          :label="command.label"
          :value="command.value"/>
      </div>
    </div>
    <dialog ref="dialog">
      <h3>Ajouter une commande</h3>
      <form method="dialog" ref="form">
        <div class="field">
          <label>Label</label>
          <input type="text" v-model="label" placeholder="Nom de la commande" />
        </div>
        <div class="field">
          <label>Valeur</label>
          <input type="text" v-model="value" placeholder="Valeur de la commande" />
        </div>
        <div class="logs">{{ logs }}</div>
        <div class="buttons">
          <button class="cancel">cancel</button>
          <button @click.prevent="pushCommand">OK</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
import Button from '@/components/button.vue'

export default {
  name: 'HomeView',
  components: {
    TopBar, Button
  },
  data(){
    return {
      label: "",
      value: "",
      commands: [],
      logs: "",
      socket: null,
      id: null,
      stream: new MediaStream(),
    }
  },
  watch:{
    socket(new_val){
      this.$store.state.socket = new_val
      this.id = Date.now()
      this.$store.state.id = this.id
    }
  },
  methods:{
    close(){
      this.$refs.dialog.showModal()
    },
    createCommand(){
      this.$refs.dialog.showModal()
    },
    validated(){
      for(let command of this.commands){
        if(command.value == this.value || command.label == this.label){
          return false
        }
      }
      return true
    },
    pushCommand(){
      if(this.validated()){
        this.commands.push({
          "label" : this.label,
          "value" : this.value.toString().padStart(3, '0')
        })
        this.$refs.dialog.close()
        this.label = ""
        this.value = ""
      } else {
        this.logs = "iyo valeur yarafashwe"
      }
    },
    startCamera(){
      let output = this.$refs.output
      navigator.mediaDevices.getUserMedia({
        'video': true,
        'audio': false
      }).then( stream => {
        this.stream = stream
        let output = this.$refs.output
        output.srcObject = this.stream
      }).catch(error => {
        console.error(error)
      })
    },
    playCommand(command){
      for(var i = 0; i < sounds.length; i++){
        track = "/static/"+sounds[i]+".mp3"
        setTimeout(() => {
          new Audio(track).play()
        }, i*200)
      }
    },
    getSocketUrl(){
      let protocol = window.location.protocol == "http:"?"ws":"wss"
      if(this.$store.state.url == ""){
        return `${protocol}://${window.location.host}/robot/`;
      }
      return `${protocol}://127.0.0.1:8000/robot/`;
    },
    createSocket(url){
      let vue = this
      this.socket = new WebSocket(url);
      this.socket.onopen = (e) => {
        console.log("[open] Connection established");
      };
      this.socket.onclose = (error) => {
        console.log('[close] Connection died');
      };
      this.socket.onerror = (error) => {
        console.log(`[error] ${error.message}`);
      };
      this.socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log(`[message] : ${event.data}`);
        vue.executeMessage(data)
      }
    },
    executeMessage(data){
      switch (data.order) {
        case "dtmf":
          if(data.sender == this.id) {
            break
          }
          this.playCommand(data.message)
          break;
        case "camera":
          if(data.sender == this.id) {
            this.streamMyCam()
            break
          }
        default:
          console.log('Unkown protocol')
          break;
      }
    }
  },
  mounted(){
    let url = this.getSocketUrl()
    this.createSocket(url)
  }
}
</script>
<style scoped>
.body{
  height: calc(100% - 60px);
  display: flex;
}
.camera{
  position: relative;
  height: 100%;
  background-color: #111;
  flex-grow: 1;
  color: #0d0;
  font-weight: 600;
}
video{
  position: relative;
  width: 100%;
  max-height: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.commander{
  height: 100%;
  flex-grow: 1;
  min-width: 49%;
}
.line{
  display: flex;
  justify-content: center;
}
.controls{
  position: absolute;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: right;
  opacity: .7;
}
.controls button{
  box-shadow: none;
}
@media screen and (max-width: 500px) {
  .body{
    display: block;
  }
  .camera{
    height: 50%;
    width: 100%;
  }
  .commander{
    width: 100%;
    height: 50%;
    overflow: auto;
  }
}
</style>
