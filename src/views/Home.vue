<template>
  <div id="app">
    <TopBar/>
    <div class="body">
      <div class="terminal">
        Aha niho twandika ama commande turungitse n'ayo turonse
        <div class="content">
          >>>
        </div>
      </div>
      <div class="commander">
        <div class="control">
          <div class="line">
            <Button label="↑" value="000"/>
          </div>
          <div class="line">
            <Button label="←" value="002"/>
            <Button label="■" value="004"/>
            <Button label="→" value="003"/>
          </div>
          <div class="line">
            <Button label="↓" value="001"/>
          </div>
        </div>
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
  }
}
</script>
<style scoped>
.body{
  height: calc(100% - 60px);
  display: flex;
}
.terminal{
  height: 100%;
  background-color: #111;
  flex-grow: 1;
  color: green;
  padding: 10px;
  font-weight: 600;
}
.commander{
  height: 100%;
  flex-grow: 1;
  min-width: 49%;
}
.line{
  display: flex;
  justify-content: center;
}
</style>
