<template>
  <div class="about">
    <h1>About</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'About',
  beforeMount () {
    document.title = 'About'
  }
})
</script>
