<template>
  <div class="parent" @click.stop>
    <div class="content">
      <h2>Choose mode</h2>
      <div>
        <div class="field">
          <label>Choisissez le mode:</label>
          <div class="inline">
            <div>
              <input type="radio" value="commander" name="mode" id="commander" v-model="mode">
              <label for="commander">Commander</label>
            </div>
            <div>
              <input type="radio" value="robot" name="mode" id="robot" v-model="mode">
              <label for="robot">Robot</label>
            </div>
          </div>
        </div>
        <div class="field" v-if="mode=='robot'">
          <label>Nom du Robot:</label>
          <input type="text"
            placeholder="Nom a affecter au robot" 
            v-model="nom">
        </div>
        <div class="field">
          <label>Mot de passe:</label>
          <input type="password"
            placeholder="clé de configuration" 
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
      mode:"commander",
      nom:"",
      password:""
    }
  },
  methods:{
    changeConfig(){
      this.$store.state.robot_name = this.nom
      this.$store.state.robot_id = new Date().getTime()
      this.$store.state.mode = this.mode
    }
  }
};
</script>
<style scoped>
h2{
  margin-bottom: 10px;
  text-align: center;
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
.inline>div{
  display: flex;
  align-items: baseline;
}
.inline label{
  padding-left: 5px;
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