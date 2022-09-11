<template>
  <v-app>
    <v-main>
      <manifest-grid/>
    </v-main>
  </v-app>
</template>

<script>
import ManifestGrid from './components/Manifest/Grid.vue'
export default {
  name: 'App',

  components: {
    ManifestGrid,
  },

  data: () => ({
    //
  }),
};
</script>
