<template>
  <div id="app">
    <TopBar @close="close"/>
    <div class="body">
      <div class="camera">
        <div class="top">
          <div class="title">{{ selected.name }}</div>
          <div v-if="!!msg">
            <div>new command: <strong>{{ msg }}</strong></div>
          </div>
        </div>
        <div class="robots">
          <Robot
            class="robot" v-for="ant in robots"
            :name="ant.name"
            :id="ant.id"/>
        </div>
      </div>
      <div class="buttons">
        
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
import Button from '@/components/button.vue'
import Robot from '@/components/robot.vue'

export default {
  components: {
    TopBar, Button, Robot
  },
  data(){
    return {
      selected:{
        name: "Main Ant",
        id:16153153
      },
      robots:[
        {id:16153153,name:"Ant no. 53"},
        {id:16153154,name:"Ant no. 54"},
        {id:16153155,name:"Ant no. 55"},
        {id:16153156,name:"Ant no. 56"},
        {id:16153157,name:"Ant no. 57"},
        {id:16153158,name:"Ant no. 58"},
        {id:16153159,name:"Ant no. 59"},
      ]
    }
  },
  methods:{
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
</style>
