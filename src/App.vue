<template>
  <div
    id="app">
    <div
      id="nav"
      role="navigation"
      class="flex items-center pt2 px2 col-12">
      <router-link
        to="/">
        Home
      </router-link>
      <span class="mx1">|</span>
      <router-link
        to="/about">
        About
      </router-link>
      <div class="flex-auto"></div>
      <div
        v-if="username"
        id="username">
        {{ username }}
      </div>
      <div>
        <button
          v-if="username"
          type="button"
          id="logout"
          class="btn"
          @click="onLogout">
          Logout
        </button>
      </div>
    </div>
    <router-view/>
    <Toasts />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Toasts from './components/Toasts.vue'
export default Vue.extend({
  name: 'App',
  components: { Toasts },
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

<style scoped>
</style>
