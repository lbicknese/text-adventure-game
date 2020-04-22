<template>
  <div class="fixed bottom-0 right-0 mb2 col-12 md-col-4">
    <div
      class="toasts mx2">
      <Toast
        v-for="notification in toasts"
        :key="notification.id"
        :notification="notification" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Toast from './Toast.vue'
@Component({
  name: 'Toasts',
  components: { Toast }
})
export default class ToastsComponent extends Vue {
  get toasts () {
    return this.$store.state.toasts.notifications
  }
}
</script>

<style>

</style>
