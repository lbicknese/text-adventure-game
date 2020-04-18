<template>
  <div>
    <h1>Login</h1>
    <label
      for="username">
      Username
    </label>
    <input
      type="text"
      id="username"
      v-model="username">
    <span
      id="username-info">
      Type in a username
    </span>
    <button
      type="button"
      id="login"
      @click="onLogin">
      Login
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Login',
  data () {
    return {
      username: ''
    }
  },
  beforeMount () {
    document.title = 'Login'
  },
  methods: {
    onLogin () {
      this.$store.dispatch('login', this.username)
        .then(() => {
          this.$router.push({ name: 'home' })
            .catch(error => {
              console.error('Routing failed', error)
            })
        })
        .catch((error) => {
          console.error('Error logging in.', error)
        })
    }
  }
})
</script>
