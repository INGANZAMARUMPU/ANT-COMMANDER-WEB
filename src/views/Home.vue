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
            <div class="button">
              <label>↑</label>
              <div class="value">000</div>
            </div>
          </div>
          <div class="line">
            <div class="button">
              <label>←</label>
              <div class="value">002</div>
            </div>
            <div class="button">
              <label>■</label>
              <div class="value">004</div>
            </div>
            <div class="button">
              <label>→</label>
              <div class="value">003</div>
            </div>
          </div>
          <div class="line">
            <div class="button">
              <label>↓</label>
              <div class="value">001</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/topbar.vue'
export default {
  name: 'HomeView',
  components: {
    TopBar
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
.button{
  padding: 5px 20px;
  margin: 5px;
  background-color: var(--primary);
  color: white;
  box-shadow: 2px 2px 5px;
  text-align: center;
}
.button:hover{
  background-color: var(--primary-light);
}
.button:active{
  background-color: var(--primary);
}
.button label{
  font-weight: 800;
  font-size: 2em;
}
.line{
  display: flex;
  justify-content: center;
}
.value{
  font-size: 0.8em!important;
}
</style>
