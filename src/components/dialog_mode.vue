<template>
  <div class="parent" @click.stop>
    <div class="content">
      <h2>Choose mode</h2>
      <div>
        <div class="field">
          <label for="nom">Nom du Robot:</label>
          <input type="text"
            placeholder="Nom a affecter au robot" 
            v-model="nom">
        </div>
        <div class="field">
          <label for="password">Mot de passe:</label>
          <input type="password"
            placeholder="mot de passe de configuration" 
            v-model="password">
        </div>
        <div class="buttons">
          <button @click="changeConfig">
            Choisir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    close(){
      this.$emit("close");
    }
  },
  data(){
    return {
      nom:"",
      password:""
    }
  }
};
</script>
<style scoped>
h2{
  margin-bottom: 10px;
}
.parent{
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .8);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  z-index: 5;
}
.content{
  background-color: white;
  margin: 10% auto;
  box-sizing: border-box;
  padding: 15px;
  border-radius: 5px;
  max-width: 300px;
}
.field{
  margin-bottom: 10px;
}
.buttons{
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 800px) {
  .content {
    margin: 10% auto;
  }
}
</style>