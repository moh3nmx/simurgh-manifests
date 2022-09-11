<template>
  <div>
    <v-menu min-width="300" absolute v-model="menu" v-bind="$attrs" :close-on-content-click="false">
      <v-card>
        <v-card-title class="body-2 font-weight-bold justify-space-between align-center">
          Manifest Options

          <v-icon @click="menu = false; $emit('deselect')" size="20">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          asdf asd f
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: true
    }
  },
  mounted() {

  },
}
</script>
<style lang="">
  
</style>