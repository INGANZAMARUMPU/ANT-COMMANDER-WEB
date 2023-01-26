<template>
  <div class="parent" @click.stop>
    <div class="content">
      <div class="title">
        <button class="close" @click="close">
          &times
        </button>
        <h2>Créer une commande</h2>
      </div>
      <div>
        <div class="field">
          <label>Nom de la commande:</label>
          <input type="text"
            placeholder="à quoi servira la commande" 
            v-model="nom" :disabled="item.frozen">
        </div>
        <div class="field">
          <label>Valeur:</label>
          <input type="text"
            placeholder="le code DMTF" 
            v-model="code">
        </div>
        <div class="buttons">
          <button @click="changeConfig">
            {{ !!item.label?"Modifier":"Ajouter"}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:[ "item" ],
  data(){
    return {
      nom:"",
      code:""
    }
  },
  watch:{
    item(new_val){
      if(!!new_val){
        this.nom = new_val.label
        this.code = new_val.value
      } else {
        this.nom = ""
        this.code = ""
      }
    }
  },
  methods:{
    close(){
      this.$emit("close");
    },
    changeConfig(){
      if(!!this.item.label){
        this.item.label = this.nom
        this.item.value = this.code 
      } else {
        let data = {
          label:this.nom,
          value: this.code
        }
        this.$store.state.buttons.push(data)
      }
      this.close()
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
  max-width: 350px;
}
.field{
  margin-bottom: 15px;
}
.buttons{
  display: flex;
  justify-content: flex-end;
}
.inline{
  display: flex;
  gap: 10px;
  padding-top: 5px;
}
.title{
  position: relative;
}
.close{
  position: absolute;
  background-color: red;
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 5px;
  top: -5px;
  right: -5px;
}
button{
  padding: 10px;
}
.field>label{
  font-weight: bold;
}
@media screen and (max-width: 800px) {
  .content {
    margin: 10% auto;
  }
}
</style>