<template>
  <div class="button">
    <label>{{ label }}</label>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props:{
    label:{type:String, required:true},
    value:{type:String, required:true},
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
