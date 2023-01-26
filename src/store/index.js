import { createStore } from 'vuex'

export default createStore({
  state: {
    url:"",
    socket:null,
    id:null,
    mode: "",
    buttons:[
      { label:"↑", value: "000", frozen:true},
      { label:"←", value: "002", frozen:true},
      { label:"■", value: "004", frozen:true},
      { label:"→", value: "003", frozen:true},
      { label:"↓", value: "001", frozen:true},
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
