<template>
  <dialog ref="dialog" @close="close">
    <p>Greetings, one and all!</p>
    <form method="dialog">
    <button>OK</button>
    </form>
  </dialog>
</template>

<script>
export default {
  props:["active"],
  watch:{
    active(new_val){
      if(new_val){
        this.$refs.dialog.showModal()
      }
    }
  },
  methods:{
    close(){
      this.$emit("close")
    }
  }
}
</script>
<style scoped>
</style>
