<template>
  <div
    class="mx2 mb3">
    <h1>Create Template</h1>
    <Template
      :template="template"
      @submit="onCreate" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Templates from '../api/Templates'
import GameTemplate from '@/models/GameTemplate'
import Template from '../components/Template.vue'
@Component({
  name: 'NewTemplate',
  components: { Template }
})
export default class NewTemplate extends Vue {
  private template = new GameTemplate()

  beforeMount () {
    document.title = 'New Template'
  }

  onCreate () {
    Templates.create(this.template)
      .then(() => {
        this.$router.push({ name: 'editTemplate', params: { id: this.template.id } })
          .catch(e => {
            console.error('There was an error redirecting', e)
          })
      })
      .catch(e => {
        console.error('There was an error creating template', e)
      })
  }
}
</script>

<style>

</style>
