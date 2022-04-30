<template>
<section class="app-section">
  <ExchangeWidget
    :initTickers="['USD', 'BTC']"
  />
</section>
</template>

<script setup>
import ExchangeWidget from './components/ExchangeWidget.vue'
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app-section {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
