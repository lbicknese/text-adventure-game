<template>
  <div
    class="px2 pb3">
    <h1>Home</h1>
    <p>
      This is the homepage.
    </p>
    <div
      class="flex flex-wrap">
      <div class="md-col-6 col-12">
        <div class="md-mr1 mb1 md-mb0 p2 border rounded bg-darken-1">
          <h2>Manage Game Template</h2>
          <p>
            Manage game templates that you create.
          </p>
          <div class="actions col-12 flex justify-end">
            <router-link
              :to="{ name: 'templates' }"
              class="btn btn-primary">
              Templates
            </router-link>
          </div>
        </div>
      </div>
      <div class="md-col-6 col-12">
        <div class="md-ml1 mt1 md-mt0 p2 border rounded bg-darken-1">
          <h2>Join Game</h2>
          <p>
            Join a game someone has shared with you.
          </p>
          <div class="actions col-12 flex justify-end">
            <button
              type="button"
              class="btn btn-primary">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  beforeMount () {
    document.title = 'Text Adventure'
  }
}
</script>
