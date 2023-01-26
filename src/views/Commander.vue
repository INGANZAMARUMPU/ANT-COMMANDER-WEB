<template>
  <div id="app">
    <TopBar @close="close"/>
    <div class="body">
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
import Button from '@/components/button.vue'

export default {
  components: {
    TopBar, Button
  },
  data(){
    return {
    }
  },
  methods:{
  }
}
</script>
<style scoped>
</style>
