<template>
<div class="base button" @contextmenu.prevent.stop="showContext">
  <div @click="play">
    <label :class="{'big':item.frozen}">
      {{ item.label }}
    </label>
    <div class="value">{{ item.value }}</div>
  </div>
  <div class="context" ref="context"
    :class="{'invisible':context_hidden}">
    <div @click="$emit('edit')">Modifier</div>
    <div @click="$emit('delete')" v-if="!item.frozen">
      Supprimer
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:{
     item:{type:Object, required:true},
  },
  data(){
    return {
      context_hidden:true
    }
  },
  methods:{
    play(){
      this.$emit("dtmf", this.item.value)
    },
    showContext(){
      this.context_hidden=false
      let vue = this
      document.addEventListener("click", this.closeContext);
    },
    closeContext(){
      this.context_hidden=true
      document.removeEventListener("click", this.closeContext)
    }
  }
}
</script>
<style scoped>
.button{
  margin: 5px;
}
.button label{
  font-weight: 800;
}
.button .big{
  font-size: 2em;
}
.value{
  font-size: 0.8em!important;
}
.base{
  position: relative;
}
.context{
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 2px;
  z-index: 1;
  top: 20px;
  left: 10px;
  color: black;
  cursor: pointer;
}
.context>*{
  text-align: left;
  padding: 2px 5px;
}
.context>*:hover{
  background-color: #3AC;
  color: white;
}
.invisible{
  display: none;
}
</style>
