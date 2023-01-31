<template>
  <div id="app">
    <TopBar @create="button_shown=true"/>
    <div class="body">
      <img src="/static/ant.webp">
      <div class="camera">
        <div class="top">
          <div class="title">{{ selected.name||'*hitamwo irobot*' }}</div>
          <div v-if="!!msg">
            <div>new command: <strong>{{ msg }}</strong></div>
          </div>
        </div>
        <div class="robots">
          <Robot
            v-for="ant in robots" :robot="ant"
            :selected="selected.id==ant.id"
            @selected="switchTo(ant)"
            :key="ant.id"/>
        </div>
      </div>
      <div class="buttons">
        <div class="control">
          <div class="line">
            <Button 
              @dtmf="sendDtmf"
              @edit="editButton(buttons[0])"
              :item="buttons[0]"/>
          </div>
          <div class="line">
            <Button 
              @dtmf="sendDtmf"
              @edit="editButton(buttons[1])"
              :item="buttons[1]"/>
            <Button 
              @dtmf="sendDtmf"
              @edit="editButton(buttons[2])"
              :item="buttons[2]"/>
            <Button 
              @dtmf="sendDtmf"
              @edit="editButton(buttons[3])"
              :item="buttons[3]"/>
          </div>
          <div class="line">
            <Button 
              @dtmf="sendDtmf"
              @edit="editButton(buttons[4])"
              :item="buttons[4]"/>
          </div>
        </div>
        <Button
          v-for="button, index in buttons.slice(5)"
          @edit="editButton(button)"
          @delete="deleteButton(index+5)"
          :item="button"/>
      </div>
    </div>
    <DialogButton
      :item="current_button"
      @close="closeDialogs"
      v-show="button_shown"/>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
import Button from '@/components/button.vue'
import Robot from '@/components/robot.vue'
import DialogButton from '@/components/dialog_button.vue'

export default {
  components: {
    TopBar, Button, Robot, DialogButton
  },
  data(){
    return {
      selected:{},
      robots:[],
      buttons:this.$store.state.buttons,
      msg:"",
      button_shown: false,
      current_button: {}
    }
  },
  watch:{
    "$store.state.buttons"(new_val){
      this.buttons = new_val
    },
  },
  methods:{
    editButton(button){
      this.current_button = button
      this.button_shown = true
    },
    deleteButton(index){
      this.$store.state.buttons.splice(index, 1)
    },
    closeDialogs(){
      this.button_shown=false
      this.current_button={}
    },
    sendDtmf(value){
      if(!this.selected.id){
        alert("banza uhitemwo robot")
      }
      let data = {
        "dest" : this.selected.id,
        "order" : "dtmf",
        "message" : value
      }
      this.socket.send(JSON.stringify(data))
    },
    switchTo(robot){
      if(robot.lost){
        this.robots = this.robots.filter(x => x.id != robot.id)
      } else {
        this.selected = robot
      }
    }
  },
  mounted(){
    let url = new URL(window.location)
    let local_origins = ["localhost", "127.0.0.1"]
    if(local_origins.includes(window.location.hostname) && url.protocol == "http"){
      url.port = 8000
    }
    url.protocol = url.protocol == "http:" ? "ws:" : "wss:"
    
    this.socket = new WebSocket(`${url.origin}/commander/`);

    let vue = this
    this.socket.onopen = function(e) {
      console.log("[open] Connection established");
    };
    this.socket.onmessage = function(event) {
      let data = JSON.parse(event.data)
      switch(data.order){
        case "your_id":
          vue.socket.send(JSON.stringify({
            order : "new_commander",
            message : data.message
          }));
          break
        case "new_robot":
          vue.robots.push(data.message)
          break
        case "robot_lost":
          let robot_id = data.message
          let robot = vue.robots.find(x => x.id == robot_id)
          robot.lost = true
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
</script>
<style scoped>
.body{
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.camera{
  background-color: black;
  color: white;
  padding: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
}
.top{
  flex: 1;
}
.title{
  font-size: 1.2em;
  font-weight: 800;
}
.robots{
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
  gap: 5px;
}
.buttons{
  flex-grow: 1;
  max-width: 49%;
}
.control{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
img{
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: .2;
  transform: rotate(-20deg);
}
</style>
