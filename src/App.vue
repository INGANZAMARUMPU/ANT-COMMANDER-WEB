<template>
  <CommanderPage v-if="$store.state.mode=='commander'"/>
  <RobotPage v-else/>
  <DialogMode
    @changed="changeConfig"
    v-if="!$store.state.mode"/>
</template>
<script>
import DialogMode from "@/components/dialog_mode"
import CommanderPage from "@/views/Commander"
import RobotPage from "@/views/Robot"
export default {
  components:{
    DialogMode, CommanderPage, RobotPage
  },
  methods:{
    changeConfig(mode){
      this.$store.state.mode = mode
    }
  }
}
</script>
<style src="./style.css">
</style>
