<template>
  <div class="button" @click="play">
    <label>{{ label }}</label>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props:{
    label:{type:String, required:true},
    value:{type:String, required:true},
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
        "message" : this.value
      }
      this.$store.state.socket.send(JSON.stringify(data))
    }
  }
}
</script>
<style scoped>
.button label{
  font-weight: 800;
  font-size: 2em;
}
.value{
  font-size: 0.8em!important;
}
</style>
