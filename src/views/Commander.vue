<template>
  <div id="app">
    <TopBar @create="createCommand" @close="close"/>
    <div class="body">
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
import Button from '@/components/button.vue'

export default {
  name: 'HomeView',
  components: {
    TopBar, Button
  },
  data(){
    return {
    }
  },
  methods:{
    close(){
      this.$refs.dialog.showModal()
    },
  }
}
</script>
<style scoped>
</style>
