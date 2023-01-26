<template>
  <div class="robot" @click="changeRobot">
    <label>{{ name }}</label>
    <div class="value">{{ id }}</div>
  </div>
</template>

<script>
export default {
  props:{
    name:{type:String, required:true},
    id:{type:String, required:true},
  },
  data(){
    return {
      audios:[]
    }
  },
  methods:{
    play(){
      let data = {
        "sender" : this.$store.state.id,
        "order" : "dtmf",
        "message" : this.id
      }
      this.$store.state.socket.send(JSON.stringify(data))
    }
  }
}
</script>
<style scoped>
.robot{
  background-color: var(--primary);
  padding: 5px;
  opacity: .5;
  cursor: default;
}
.robot label{
  font-weight: 800;
  font-size: 1.1em;
}
.value{
  font-size: 0.8em!important;
}
</style>
