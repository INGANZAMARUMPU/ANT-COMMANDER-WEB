<template>
  <div id="app">
    <TopBar/>
    <div class="body">
      <div class="camera">
        <video ref="output" id="output" autoplay playsinline/>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'

export default {
  components: {
    TopBar
  },
}
</script>
<style scoped>
.camera{
  background-color: black;
  height: 100%;
}
</style>
