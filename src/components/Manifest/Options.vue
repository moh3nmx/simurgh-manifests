<template>
  <div>
    <v-menu
      min-width="300"
      absolute
      v-model="menu"
      v-bind="$attrs"
      :close-on-click="false"
      content-class="rounded-lg"
      :close-on-content-click="false"
    >
      <v-card rounded="lg">
        <v-card-title
          class="body-2 font-weight-bold justify-space-between align-center"
        >
          Manifest Options

          <v-icon
            @click="
              menu = false;
              $emit('deselect');
            "
            size="20"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <div>
            <v-btn small color="primary" depressed class="mr-2">View</v-btn>
            <v-btn small color="info" depressed class="mr-2">Edit</v-btn>
            <v-btn small color="error" depressed class="mr-2">Delete</v-btn>
          </div>
          <v-divider class="my-4"></v-divider>
          <div>
            <v-btn
              outlined
              small
              color="primary"
              depressed
              class="mr-2"
              @click="$emit('open-meta', btn)"
              v-for="btn in buttons"
              :key="'btn-' + btn"
            >
              {{ btn }}
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  name: 'ManifestOptions',
  data() {
    return {
      menu: true,
      buttons: ["classification", "subject", "technique", "medium"],
    };
  },
  mounted() {},
  watch: {
    menu() {
      if(!this.menu) this.$emit('deselect');
    }
  }
};
</script>
<style lang="">
</style>