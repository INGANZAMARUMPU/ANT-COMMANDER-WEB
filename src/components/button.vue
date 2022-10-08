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
.button{
  padding: 5px 20px;
  margin: 5px;
  background-color: var(--primary);
  color: white;
  box-shadow: 2px 2px 5px;
  text-align: center;
}
.button:hover{
  background-color: var(--primary-light);
}
.button:active{
  background-color: var(--primary);
}
.button label{
  font-weight: 800;
  font-size: 2em;
}
.value{
  font-size: 0.8em!important;
}
</style>
