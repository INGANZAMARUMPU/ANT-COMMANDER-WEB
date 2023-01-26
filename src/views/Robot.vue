<template>
  <div id="app">
    <TopBar @create="createCommand" @close="close"/>
    <div class="body">
      <div class="camera">
        <div class="controls">
          <button @click="switchLive">
            {{ is_hosting?"Stop":"Start" }}
          </button>
          <button @click="switchMode">
            Switch
          </button>
        </div>
        <video ref="output" id="output" autoplay playsinline/>
      </div>
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
}
</script>
<style scoped>
</style>
