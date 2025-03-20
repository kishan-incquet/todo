<template>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
export default {
  "name": "App",
  components: {
    "RouterView": RouterView
  }
}
</script>