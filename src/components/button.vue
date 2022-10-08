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
      let track
      for(var i = 0; i < this.value.length; i++){
        track = "/static/"+this.value[i]+".mp3"
        setTimeout(() => {
          new Audio(track).play()
        }, i*200)
      }
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
