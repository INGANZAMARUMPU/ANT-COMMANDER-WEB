<template>
  <Home/>
  <DialogMode v-if="!$store.state.user"/>
</template>
<script>
import DialogMode from "@/components/dialog_mode"
import Home from "@/views/Home"
export default {
  components:{
    DialogMode, Home
  }
}
</script>
<style src="./style.css">
</style>
