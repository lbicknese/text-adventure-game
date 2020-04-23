<template>
  <div
    v-if="open"
    class="confirmation fixed top-0 bottom-0 left-0 right-0 bg-darken-4">
    <div class="inner-modal mx-auto border rounded col-6 mt4 p2 bg-gray">
      <div class="h4">Confirm</div>
      <p
        class="center">
        {{ message }}
      </p>
      <div class="flex">
        <button
          type="button"
          class="btn btn-primary bg-darken-3"
          @click="onCancel">
          Cancel
        </button>
        <span class="flex-auto"></span>
        <button
          type="button"
          class="btn btn-primary"
          @click="onOk">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  name: 'Confirmation'
})
export default class ConfirmationComponent extends Vue {
  @Prop({ default: false }) open!: boolean
  @Prop({ default: '' }) message!: string

  onCancel () {
    this.$emit('cancel')
  }

  onOk () {
    this.$emit('ok')
  }
}
</script>

<style scoped>
.inner-modal {
  opacity: 1;
}
</style>
