<template>
  <div class="component">
    <h1>ANT ROBOT COMMANDER</h1>
    <div class="options">
      <h1>+</h1>
      <h1>☼</h1>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>
<style scoped>
.component{
  height: 60px;
  box-shadow: 0 0 5px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.options{
  display: flex;
  height: 100%;
}
.options > *{
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.options > *:hover{
  background-color: var(--primary);
  color: white;
  cursor: default;
}
.options > *:active{
  background-color: var(--primary-light);
  color: white;
  cursor: default;
}
</style>
