<template>
  <div
    class="loader"
    :style="{ height: `${size}px`, width: `${size}px` }">
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'Loader'
})
export default class LoaderComponent extends Vue {
  @Prop({ default: 50 }) size!: number
}
</script>

<style scoped>
.loader {
  border: 16px solid gray;
  border-top: 16px solid blue;
  /* border-radius: 50%; */
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
