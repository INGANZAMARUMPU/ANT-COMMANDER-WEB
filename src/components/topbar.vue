<template>
<div>
  <div class="component">
    <h1 class="title"></h1>
    <div class="options">
      <h1
        v-if="$store.state.mode=='commander'"
        @click="$emit('create')">
        +
      </h1>
      <h1 class="close"
        @click="logout">
        &times
      </h1>
    </div>
  </div>
  <div class="shadow"></div>
</div>
</template>

<script>
export default {
  methods:{
    logout(){
      if(window.confirm("Voulez-vous vraiment voudeconnecter?")){
        this.$store.state.user = null
      }
    }
  }
}
</script>
<style scoped>
.component{
  height: 60px;
  padding: 0 0 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.shadow{
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(100,100,100,1) 0%, rgba(120,120,120,1) 10%, rgba(255,255,255,.3) 100%);
  height: 5px;
  width: 100%;
  position: absolute;
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
.close{
  color: red;
}
.close:hover{
  background-color: red;
  color: white;
  cursor: default;
}
.close:active{
  background-color: darkred;
  color: white;
  cursor: default;
}
@media screen and (min-width: 600px) {
  .title::after{
    content: "ANT ROBOT COMMANDER V2.0";
  }
}
@media screen and (max-width: 600px) {
  .title::after{
    content: "ANT COMMANDER V2.0";
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
