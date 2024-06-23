import { createStore } from 'vuex'

export default createStore({
  state: {
    // url:"http://192.168.1.1:9000/api",
    url:"http://127.0.0.1:9000/api",
    user:null,
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
