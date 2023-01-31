<template>
<div class="border" :class="{'lost':robot.lost}">
  <div class="robot"
    :class="{'selected':selected}"
    @click="$emit('selected')">
    <label>{{ robot.name }}</label>
    <div class="value">{{ robot.id }}</div>
  </div>
</div>
</template>

<script>
export default {
  props:{
    robot:{type:Object, required:true},
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
.border:not(.lost):has(.selected){
  box-shadow: 0 0 10px 1px var(--primary);
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
.robot:hover, .selected{
  opacity: .7;
}
.border.lost{
  border: 1px solid darkred;
}
.lost .robot{
  background-color: red;
}
.lost .robot:hover,.lost .robot .selected{
  opacity: .4;
}
</style>
