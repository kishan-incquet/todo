<template>
  <v-app>
    <RouterView></RouterView>
  </v-app>
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