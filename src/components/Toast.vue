<template>
  <div
    class="relative"
    :class="{
      'bg-blue': notification.state === 'info',
      'bg-red': notification.state === 'error',
      'bg-green': notification.state === 'success'
    }">
    <div
      class="toast border rounded p1 col-12 mt1 bg-lighten-4 border-blue"
      :class="{
        'border-blue': notification.state === 'info',
        'border-red': notification.state === 'error',
        'border-green': notification.state === 'success'
      }">
      <button
        type="button"
        class="absolute top-0 right-0 close border-none bold"
        aria-label="Close toast notification"
        @click="onClose">
        &times;
      </button>
      {{ notification.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Notification } from '../store/toasts'
@Component({
  name: 'Toast'
})
export default class ToastComponent extends Vue {
  @Prop({ default: null }) notification!: Notification
  onClose () {
    this.$store.dispatch('toasts/remove', this.notification.id)
  }
}
</script>

<style scoped>
.close {
  height: 2em;
  width: 2em;
  background-color: inherit;
  margin-top: 1px;
  margin-right: 1px;
  cursor: pointer;
}
</style>
