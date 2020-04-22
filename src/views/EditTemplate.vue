<template>
  <div
    class="mx2 mb3">
    <h1>{{ template.name }}</h1>
    <Template
      :template="template"
      @submit="onUpdate" />
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
export default class EditTemplateView extends Vue {
  template: GameTemplate = new GameTemplate()

  beforeMount () {
    document.title = 'Edit Template'
  }

  mounted () {
    Templates.get(this.$route.params.id)
      .then(template => {
        this.template = template
      })
  }

  onUpdate () {
    Templates.update(this.template)
      .then(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'Updated template', state: 'success' }))
      })
  }
}
</script>

<style>

</style>
