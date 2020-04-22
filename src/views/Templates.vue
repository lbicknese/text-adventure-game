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
              @click="onDelete(template.id)">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Templates from '../api/Templates'
import GameTemplate from '@/models/GameTemplate'
@Component({
  name: 'Templates'
})
export default class TemplatesView extends Vue {
  templates = new Array<GameTemplate>()
  beforeMount () {
    document.title = 'Templates'
  }

  mounted () {
    Templates.query()
      .then((templates: GameTemplate[]) => {
        this.templates = templates
      })
  }

  onDelete (key: string) {
    Templates.delete(key)
      .then(() => {
        Templates.query()
          .then(templates => {
            this.templates = templates
          })
      })
  }
}
</script>

<style scoped>
th, td {
  text-align: left;
}
</style>
