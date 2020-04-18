<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <div
        v-if="username"
        id="username">
        {{ username }}
      </div>
      <button
        v-if="username"
        type="button"
        id="logout"
        @click="onLogout">
        Logout
      </button>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'App',
  computed: {
    username () { return this.$store.state.username }
  },
  beforeCreate () {
    this.$store.dispatch('load')
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    }
  }
})
</script>

<style>

</style>
