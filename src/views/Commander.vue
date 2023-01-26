<template>
  <div id="app">
    <TopBar @create="button_shown=true"/>
    <div class="body">
      <div class="camera">
        <div class="top">
          <div class="title">{{ selected.name||'*select a robot*' }}</div>
          <div v-if="!!msg">
            <div>new command: <strong>{{ msg }}</strong></div>
          </div>
        </div>
        <div class="robots">
          <Robot
            v-for="ant in robots"
            :name="ant.name" :id="ant.id"
            :selected="selected.id==ant.id"
            @selected="selected=ant"
            :key="ant.id"/>
        </div>
      </div>
      <div class="buttons">
        <div class="control">
          <div class="line">
            <Button 
              @edit="editButton(buttons[0])"
              :item="buttons[0]"/>
          </div>
          <div class="line">
            <Button 
              @edit="editButton(buttons[1])"
              :item="buttons[1]"/>
            <Button 
              @edit="editButton(buttons[2])"
              :item="buttons[2]"/>
            <Button 
              @edit="editButton(buttons[3])"
              :item="buttons[3]"/>
          </div>
          <div class="line">
            <Button 
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
      robots:[
        {id:16153153,name:"Ant no. 53"},
        {id:16153154,name:"Ant no. 54"},
        {id:16153155,name:"Ant no. 55"},
        {id:16153156,name:"Ant no. 56"},
        {id:16153157,name:"Ant no. 57"},
        {id:16153158,name:"Ant no. 58"},
        {id:16153159,name:"Ant no. 59"},
      ],
      buttons:this.$store.state.buttons,
      msg:"",
      button_shown: false,
      current_button: null
    }
  },
  watch:{
    "$store.state.buttons"(new_val){
      this.buttons = new_val
    }
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
      this.current_button=null
    }
  }
}
</script>
<style scoped>
.body{
  display: flex;
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
}
.control{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
