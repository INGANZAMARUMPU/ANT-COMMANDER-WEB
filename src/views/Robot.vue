<template>
  <div id="app">
    <TopBar/>
    <div class="body">
      <div class="camera">
        <div class="top">
          <div class="title">
            izina: {{ $store.state.robot_name||'*ntiwahisemwo izina*' }}
          </div>
          <div v-if="!!msg">
            <div>new command: <strong>{{ msg }}</strong></div>
          </div>
        </div>
        <video ref="output" id="output" autoplay playsinline/>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'

export default {
  components: {
    TopBar
  },
  data(){
    return {
      msg:"",
      socket: null
    }
  },
  watch:{
    "$store.state.robot_name"(new_val){
      if(!!new_val){
        let url = new URL(window.location)
        let local_origins = ["localhost", "127.0.0.1"]
        if(local_origins.includes(window.location.hostname) && url.protocol == "http"){
          url.port = 8000
        }
        url.protocol = url.protocol == "http:" ? "ws:" : "wss:"
        this.socket = new WebSocket(`${url.origin}/robot/`);
        let vue = this
        this.socket.onopen = function(e) {
          console.log("[open] Connection established");
        };

        this.socket.onmessage = function(event) {
          let data = JSON.parse(event.data)

          switch(data.order){
            case "your_id":
              vue.$store.state.robot_id = data.message
              vue.socket.send(JSON.stringify({
                order : "new_robot",
                message : {
                  id: data.message,
                  name: vue.$store.state.robot_name
                }
              }));
              break
            case "new_commander":
              vue.socket.send(JSON.stringify({
                order : "new_robot",
                dest : data.message,
                message : {
                  id: vue.$store.state.robot_id,
                  name: vue.$store.state.robot_name
                }
              }));
              break
            case "dtmf":
              vue.playDtmf(data.message)
              break
          }
        };
        this.socket.onclose = function(event) {
          if (event.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
          } else {
            console.log('[close] Connection died');
            console.log(`[close] ${JSON.stringify(event)}`);
          }
        };
        this.socket.onerror = function(error) {
          console.log(`[error] ${JSON.stringify(error)}`);
        };
      }
    }
  },
  methods:{
    playDtmf(str_dtmf){
      this.msg = str_dtmf
      let track
      for(var i = 0; i < str_dtmf.length; i++){
        track = "/static/"+str_dtmf[i]+".mp3"
        setTimeout(() => {
          new Audio(track).play()
        }, i*200)
      }
    },
  }
}
</script>
<style scoped>
.camera{
  background-color: black;
  height: 100%;
  color: white;
  padding: 20px;
}
.top{
  flex: 1;
}
.title{
  font-size: 1.2em;
  font-weight: 800;
}
</style>
