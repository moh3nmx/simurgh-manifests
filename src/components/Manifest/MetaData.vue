<template>
  <div>
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card :disabled="saving || fetching" :loading="fetching">
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider class="mb-4"></v-divider>
        <v-card-text>
          <v-card outlined>
            <v-data-table
              :items-per-page="20"
              hide-default-footer
              dense
              :items="metaData"
              :headers="tableHeaders"
              disable-sort
            >
          <template #[`item.action`]="{item}">
            <v-btn icon small color="error" @click="openDeletePrompt(item)">
              <v-icon small>
                mdi-close
              </v-icon>
            </v-btn>
          </template>
          </v-data-table>
          </v-card>

          <v-form class="mt-6">
            <base-label>Language</base-label>
            <v-select
              :items="languages"
              dense
              outlined
              v-model="model.language"
            ></v-select>

            <base-label>Value</base-label>
            <v-text-field outlined dense v-model="model.value"></v-text-field>
          </v-form>

          <v-row class="mt-4">
            <v-col cols="6">
              <v-btn block depressed color="primary" :loading="saving" @click="saveMetaData">Save</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block outlined @click="close">Cancel</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <base-prompt ref="prompt" :loading="fetching" @accept="deleteMetaData" />
  </div>
</template>
<script>
import { Enrich } from "@/plugins/apiconfig";
import { getMetaData, saveMetaData, deleteMetaData } from "@/services/manifest.service";
export default {
  data() {
    return {
      dialog: false,
      item: null,
      type: null,
      fetching: true,
      saving: false,
      model: {
        language: "",
        value: "",
      },
      tableHeaders: [
        {
          value: "language",
          text: "Language",
        },
        {
          value: "value",
          text: "Value",
        },
        {
          value: 'action',
          text: ''
        }
      ],
      metaData: [],
      languages: [
        { value: "fa", text: "فارسی" },
        { value: "en", text: "English" },
        { value: "fr", text: "French" },
        { value: "du", text: "Dutch" },
        { value: "tr", text: "Turkish" },
        { value: "ar", text: "Arabic" },
      ],
    };
  },
  methods: {
    open(item, type) {
      this.item = item;
      this.type = type;
      this.model = {
        language: "",
        value: "",
      };
      if (this.item && this.type) {
        this.getMetaData();
      }
      this.dialog = true;
    },
    openDeletePrompt(item) {
      this.$refs.prompt.open(item)
    },
    close(){
      this.dialog = false
      this.$emit('update')
    },
    async getMetaData() {
      this.metaData = [];
      this.fetching = true;
      try {
        const data = await getMetaData(this.endpoint);
        if (data) {
          this.metaData = data;
        }
      } catch (e) {
        console.log(e);
      }
      this.fetching = false;
    },
    async saveMetaData() {
      this.saving = true;
      try {
        await saveMetaData(this.endpoint, this.model);
        this.metaData.push({ ...this.model });
        this.model = {
          language: "",
          value: "",
        };
        this.$toasted.success(this.type.capitalize() + ' Meta Data Saved!')
      } catch (e) {
        console.log(e);
      }
      this.saving = false;
    },
    async deleteMetaData(item) {
      this.fetching = true;
      try {
        await deleteMetaData(this.endpoint, item);
        await this.getMetaData();
        this.$toasted.success(this.type.capitalize() + ' Meta Data Deleted!')
      } catch (e) {
        console.log(e);
      }
      this.fetching = false;
    },
  },
  computed: {
    title() {
      if (this.item) {
        return "Metadata for " + this.type;
      } else return "Metadata";
    },
    endpoint() {
      return `${Enrich}${this.item.id}/${this.type}`;
    },
  },
};
</script>
<style lang="">
</style>