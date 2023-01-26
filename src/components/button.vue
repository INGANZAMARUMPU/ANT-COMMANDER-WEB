<template>
  <div class="button" @click="play">
    <label :class="{'big':item.frozen}">
      {{ item.label }}
    </label>
    <div class="value">{{ item.value }}</div>
  </div>
</template>

<script>
export default {
  props:{
     item:{type:Object, required:true},
  },
  data(){
    return {
      audios:[]
    }
  },
  methods:{
    play(){
      // let data = {
      //   "sender" : this.$store.state.id,
      //   "order" : "dtmf",
      //   "message" : this.value
      // }
      // this.$store.state.socket.send(JSON.stringify(data))
    }
  }
}
</script>
<style scoped>
.button{
  margin: 5px;
}
.button label{
  font-weight: 800;
}
.button .big{
  font-size: 2em;
}
.value{
  font-size: 0.8em!important;
}
</style>
