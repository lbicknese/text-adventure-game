<template>
  <form
    name="newTemplateForm"
    novalidate="true"
    @submit.prevent="onSave">
    <label
      for="name"
      class="label">
      Name *
    </label>
    <input
      type="text"
      id="name"
      class="input"
      :class="{ 'border-red': errors.name }"
      v-model="template.name"
      aria-describedby="name-info name-error"
      autofocus
      required>
    <p
      v-show="errors.name"
      id="name-error"
      class="red error">
      * Name is a required field.
    </p>
    <p
      id="name-info"
      class="muted">
      This will be the title of your game.
    </p>
    <label
      for="description"
      class="label">
      Description *
    </label>
    <textarea
      name="description"
      id="description"
      cols="30"
      rows="10"
      class="textarea"
      :class="{ 'border-red': errors.description }"
      v-model="template.description"
      aria-describedby="description-info description-error"
      required>
    </textarea>
    <p
      v-show="errors.description"
      id="description-error"
      class="red error">
      * Description is a required field.
    </p>
    <p
      id="description-info"
      class="muted">
      Enter a description of this game. You can use Markdown.
    </p>
    <div
      class="flex">
      <router-link
        :to="{ name: 'templates' }"
        id="cancel"
        class="btn btn-outline mr1">
        Cancel
      </router-link>
      <button
        type="submit"
        class="btn btn-primary">
        Save
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import GameTemplate from '../models/GameTemplate'

@Component
export default class Template extends Vue {
  @Prop() private template!: GameTemplate

  errors = { name: false, description: false }

  onSave () {
    this.errors = { name: false, description: false }
    if (this.template.name.length === 0) {
      this.errors.name = true
    }
    if (this.template.description.length === 0) {
      this.errors.description = true
    }
    if (!this.errors.name && !this.errors.description) {
      this.$emit('submit')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
