<template>
  <div
    class="mx2 mb3">
    <div class="flex items-center">
      <h1>Templates</h1>
      <div class="flex-auto"></div>
      <div>
        <router-link
          :to="{ name: 'newTemplate' }"
          id="create"
          class="btn btn-primary">
          &#43; Create
        </router-link>
      </div>
    </div>
    <table
      class="col-12">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Created</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="template in templates"
          :key="template.id">
          <td>{{ template.name }}</td>
          <td>{{ template.description }}</td>
          <td>{{ template.created }}</td>
          <td
            class="right">
            <router-link
              :to="{ name: 'editTemplate', params: { id: template.id } }"
              class="btn btn-small bg-green white rounded">
              Edit
            </router-link>
            <button
              type="button"
              class="btn btn-small bg-red white rounded ml1"
              @click="onConfirmDelete(template)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="templates.length === 0"
      class="flex flex-column">
      <div class="block mx-auto my1">
        You don't have any templates, yet. Create your first template.
      </div>
      <div class="block mx-auto my1">
        <router-link
          :to="{ name: 'newTemplate' }"
          id="create"
          class="btn btn-primary">
          &#43; Create
        </router-link>
      </div>
    </div>
    <Confirmation
      :open="confirmDelete"
      :message="confirmDeleteMessage"
      @ok="onDelete"
      @cancel="confirmDelete = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Templates from '../api/Templates'
import GameTemplate from '@/models/GameTemplate'
import { Notification } from '../store/toasts'
import Confirmation from '../components/Confirmation.vue'
@Component({
  name: 'Templates',
  components: { Confirmation }
})
export default class TemplatesView extends Vue {
  templates = new Array<GameTemplate>()
  templateId!: string
  confirmDelete = false
  confirmDeleteMessage = '';

  beforeMount () {
    document.title = 'Templates'
  }

  mounted () {
    Templates.query()
      .then((templates: GameTemplate[]) => {
        this.templates = templates
      })
  }

  onConfirmDelete (template: GameTemplate): void {
    this.templateId = template.id
    this.confirmDeleteMessage = `Are you sure you want to delete ${template.name}?`
    this.confirmDelete = true
  }

  onDelete () {
    Templates.delete(this.templateId)
      .then(() => {
        this.$store.dispatch('toasts/add', new Notification({ message: 'Deleted template', state: 'success' }))
        Templates.query()
          .then(templates => {
            this.templates = templates
          })
      })
      .finally(() => {
        this.confirmDelete = false
        this.templateId = ''
        this.confirmDeleteMessage = ''
      })
  }
}
</script>

<style scoped>
th, td {
  text-align: left;
}
</style>
