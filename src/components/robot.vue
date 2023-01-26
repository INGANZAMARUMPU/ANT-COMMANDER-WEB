<template>
<div class="border">
  <div class="robot"
    :class="{'selected':selected}"
    @click="selected?'':$emit('selected')">
    <label>{{ name }}</label>
    <div class="value">{{ id }}</div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    name:{type:String, required:true},
    id:{type:Number, required:true},
    selected:{type:Boolean, default:false},
  },
  data(){
    return {
      audios:[]
    }
  },
}
</script>
<style scoped>
.border{
  border: 1px solid var(--primary);
}
.robot{
  background-color: var(--primary);
  padding: 5px;
  opacity: .4;
  cursor: default;
}
.robot label{
  font-weight: 800;
}
.value{
  font-size: 0.8em!important;
}
.robot:hover,.selected{
  opacity: .7;
}
</style>
