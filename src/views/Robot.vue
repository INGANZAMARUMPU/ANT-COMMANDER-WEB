<template>
  <div id="app">
    <TopBar/>
    <div class="body">
      <div class="camera">
        <div class="top">
          <div class="title">
            izina: {{ $store.state.robot_name||'*ntiwahisemwo izina*' }}
          </div>
          <div v-if="!!msg">
            <div>new command: <strong>{{ msg }}</strong></div>
          </div>
        </div>
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
  data(){
    return {
      msg:""
    }
  }
}
</script>
<style scoped>
.camera{
  background-color: black;
  height: 100%;
  color: white;
  padding: 20px;
}
.top{
  flex: 1;
}
.title{
  font-size: 1.2em;
  font-weight: 800;
}
</style>
