<template>
  <div
    class="mx2 mb3">
    <h1>Create Template</h1>
    <Template
      :template="template"
      :saving="saving"
      @submit="onCreate" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Templates from '../api/Templates'
import GameTemplate from '@/models/GameTemplate'
import Template from '../components/Template.vue'
import { Notification } from '../store/toasts'
@Component({
  name: 'NewTemplate',
  components: { Template }
})
export default class NewTemplate extends Vue {
  saving = false
  private template = new GameTemplate()

  beforeMount () {
    document.title = 'New Template'
  }

  onCreate () {
    this.saving = true
    Templates.create(this.template)
      .then(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'Created template', state: 'success' }))
        this.$router.replace({ name: 'editTemplate', params: { id: this.template.id } })
          .catch(() => {
            this.$store.dispatch('toasts/add', new Notification({ message: 'There was an error redirecting', state: 'error' }))
          })
      })
      .catch(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'There was an error creating template.', state: 'error' }))
      })
      .finally(() => {
        this.saving = false
      })
  }
}
</script>

<style>

</style>
