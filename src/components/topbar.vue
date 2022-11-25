<template>
  <div class="component">
    <h1 class="title"></h1>
    <div class="options">
      <h1 @click="createCommand">+</h1>
      <h1>☼</h1>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    createCommand(){
      this.$emit("create")
    }
  }
}
</script>
<style scoped>
.component{
  height: 60px;
  box-shadow: 0 0 5px;
  padding: 0 0 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.options{
  display: flex;
  height: 100%;
}
.options > *{
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.options > *:hover{
  background-color: var(--primary);
  color: white;
  cursor: default;
}
.options > *:active{
  background-color: var(--primary-light);
  color: white;
  cursor: default;
}
@media screen and (min-width: 600px) {
  .title::after{
    content: "ANT ROBOT COMMANDER V1.0";
  }
}
@media screen and (max-width: 600px) {
  .title::after{
    content: "ANT COMMANDER";
  }
}
@media screen and (max-width: 400px) {
  .title::after{
    font-size: .8em;
  }
  .component{
    padding: 0 0 0 10px;
  }
  .options > *{
    padding: 0 10px;
  }
}
</style>
