<template>
  <div
    class="mx2 mb3">
    <div
      v-if="loading"
      class="flex justify-center mt4">
      <Loader />
    </div>
    <div
      v-if="!loading">
      <h1>{{ template.name }}</h1>
      <Template
        :template="template"
        :saving="saving"
        @submit="onUpdate" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Templates from '../api/Templates'
import GameTemplate from '@/models/GameTemplate'
import Template from '../components/Template.vue'
import { Notification } from '../store/toasts'
import Loader from '../components/Loader.vue'
@Component({
  name: 'NewTemplate',
  components: { Template, Loader }
})
export default class EditTemplateView extends Vue {
  loading = true
  saving = false
  template: GameTemplate = new GameTemplate()

  beforeMount () {
    document.title = 'Edit Template'
  }

  mounted () {
    Templates.get(this.$route.params.id)
      .then(template => {
        this.template = template
      })
      .catch(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'Failed to get template', state: 'error' }))
        this.$router.replace({ name: 'templates' })
      })
      .finally(() => {
        this.loading = false
      })
  }

  onUpdate () {
    this.saving = true
    Templates.update(this.template)
      .then(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'Updated template', state: 'success' }))
      })
      .catch(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'Update failed', state: 'error' }))
      })
      .finally(() => {
        this.saving = false
      })
  }
}
</script>

<style>

</style>
