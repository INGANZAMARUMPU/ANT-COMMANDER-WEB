<template>
  <div id="app">
    <TopBar @create="create_shown=true" @close="close"/>
    <div class="body">
      <div class="terminal">
        Aha niho twandika ama commande turungitse n'ayo turonse,<br>
        hari n'igihe twohitamwo kuhashira camera mu ma version azokurikira
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
    <DialogCommand :active="create_shown"/>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
import Button from '@/components/button.vue'
import DialogCommand from '@/components/dialog_command.vue'

export default {
  name: 'HomeView',
  components: {
    TopBar, Button, DialogCommand
  },
  data(){
    return {
      create_shown:false
    }
  },
  methods:{
    close(){
      this.create_shown = false
    }
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
  color: #0d0;
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
