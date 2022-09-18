<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card :loading="loading" :disabled="loading">
      <v-card-title> Are you sure? </v-card-title>
      <v-card-text>
        <div class="text-center">
          <v-btn depressed @click="dialog = false">No</v-btn>
          <v-btn depressed color="error" @click="$emit('accept', value)">
            Yes
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'BasePrompt',
  props: {
    loading: Boolean,
  },
  data() {
    return {
      dialog: false,
      value: null
    };
  },
  methods: {
    open(value) {
      this.value = value
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
<style lang="">
</style>