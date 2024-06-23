import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'

window.axios = axios;
const app = createApp(App)
  .use(store)

app.mixin({
  methods: {
    cleanString(str){
      if (!str) return "";
      if(typeof(str)=='object'){
        let string = ""
        for( let [clef, valeur] of Object.entries(str)){
          if(typeof(valeur)=='object'){
            let child = ""
            for( let [key, value] of Object.entries(valeur)){
              child += ` ${value} `
            }
            valeur = child;
          }
          string+=`${clef.toUpperCase()}: ${valeur}`
        }
        return string;
      };
      str = str.toString();
      return str.replace( /(<([^>]+)>)/ig, '');
    },
    formatedDatetime(x) {
      if(!x) return "-"
      let date = new Date(x);
      return new Intl.DateTimeFormat(
        'en-GB',
        { dateStyle: 'short', timeStyle: 'short' }
      ).format(date)
    },
    formatedDate(x) {
      const options = { year: "numeric", month: "short", day: "numeric" }
      return new Date(x).toLocaleDateString(undefined, options)
    },
    displayErrorOrRefreshToken(error, callback, elseCallback, verbose=true){
      if(!!error.response){
        if(error.response.data.code == "token_not_valid"){ 
          let refresh = this.$store.state.user.refresh
          if(!refresh){
            this.$store.state.user = null;
            return
          }
          axios.post(this.url+"/refresh/", {"refresh":refresh})
          .then((response) => {
            this.$store.state.user.access = response.data.access
            if(typeof callback == "function") callback()
          }).catch((error) => {
            this.$store.state.user = null;
            console.error(error)
          })
        } else {
          if(verbose)
            this.makeToast('Error', error.response.data)
          if(typeof(elseCallback) == 'function'){
            elseCallback()
          }
        }
      } else {
        if(!!error.message && verbose){
          this.makeToast('Error', error.message)
        }
        console.error(error)
      }
    },
  },
  computed:{
    user(){
    	return this.$store.state.user.user;
    },
    url(){
      return this.$store.state.url;
    },
    headers(){
      return {
        headers:{
          "Authorization":"Bearer "+this.$store.state.user.access
        }
      }
    }
  }
})
app.mount('#app');