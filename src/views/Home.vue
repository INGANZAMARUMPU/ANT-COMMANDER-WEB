<template>
  <div id="app">
    <TopBar @create="createCommand" @close="close"/>
    <div class="body">
      <div class="terminal">
        Aha niho twandika ama commande turungitse n'ayo turonse,<br>
        hari n'igihe twohitamwo kuhashira camera mu ma version azokurikira
        <div class="content">
          >>>
        </div>
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
          <input type="number" v-model="value" placeholder="Valeur de la commande" />
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
      label:"",
      value:"",
      commands:[],
      logs:"",
      socket:null,
      id:null
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
    }
  },
  mounted(){
    // this.socket = new WebSocket(`ws://${window.location.host}/robot/`);
    this.socket = new WebSocket(`ws://127.0.0.1:8000/robot/`);
    this.socket.onopen = function(e) {
      console.log("[open] Connection established");
      console.log("Sending to server");
    };
    this.socket.onmessage = function(event) {
      console.log(`[message] Data received from server: ${event.data}`);
      let track
      if(event.data.sender == this.id) {
        console.log(`cannot play my own message`);
        return
      }
      let value = event.data.message

      for(var i = 0; i < value.length; i++){
        track = "/static/"+value[i]+".mp3"
        setTimeout(() => {
          new Audio(track).play()
        }, i*200)
      }
    };

    this.socket.onclose = function(event) {
      if (event.wasClean) {
        console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        console.log('[close] Connection died');
      }
    };

    this.socket.onerror = function(error) {
      console.log(`[error] ${error.message}`);
    };
  }
}
</script>
<style scoped>
.body{
  height: calc(100% - 60px);
  display: flex;
}
.terminal{
  height: 100%;
  background-color: #111;
  flex-grow: 1;
  color: #0d0;
  padding: 10px;
  font-weight: 600;
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
</style>
