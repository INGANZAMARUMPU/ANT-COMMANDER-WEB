<template>
  <div class="parent" @click.stop>
    <div class="content">
      <h2>Connexion</h2>
      <div>
        <div class="field">
          <label>Nom d'utilisateur:</label>
          <input type="text"
            placeholder="Nom a affecter au robot" 
            v-model="username">
        </div>
        <div class="field">
          <label>Mot de passe:</label>
          <input type="password"
            placeholder="clé de configuration" 
            v-model="password">
        </div>
        <div class="buttons">
          <button @click="login">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{},
  data(){
    return {
      username:"",
      password:""
    }
  },
  methods:{
    login(){
      let data = {
        username:this.username,
        password:this.password
      }
      axios.post(this.url+"/login/", data)
      .then((response) => {
        this.$store.state.user = response.data
      }).catch((error) => {
        console.error(error)
      })
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