<template>
  <v-container id="manifest_grid" class="py-8">
    <v-card elevation="6" rounded="lg">
      <v-card-text>
        <div class="mb-4 d-flex align-center justify-space-between">
          <div class="body-1">
            Page {{ filters.PageIndex + 1 }} of {{ totalPages }}
          </div>
          <v-select
            outlined
            dense
            hide-details=""
            style="max-width: 150px"
            :items="[20, 30, 40, 50]"
            label="Items per page"
            v-model="filters.PageSize"
          ></v-select>
        </div>
        <v-data-table
          disable-sort
          hide-default-footer
          :items-per-page="filters.PageSize"
          :loading="loading"
          :headers="headers"
          :items="items"
          :item-class="rowClass"
          dense
          centered
          fixed-header
          height="calc(100vh - 200px)"
        >
          <!-- classification -->
          <template #[`item.classification`]="{ item }">
            <div v-for="(c, i) in item.classification" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.classification.length - 1"></v-divider>
            </div>
          </template>
          <!-- subject -->
          <template #[`item.subject`]="{ item }">
            <div v-for="(c, i) in item.subject" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.subject.length - 1"></v-divider>
            </div>
          </template>
          <!-- technique -->
          <template #[`item.technique`]="{ item }">
            <div v-for="(c, i) in item.technique" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.technique.length - 1"></v-divider>
            </div>
          </template>
          <!-- medium -->
          <template #[`item.medium`]="{ item }">
            <div v-for="(c, i) in item.medium" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.medium.length - 1"></v-divider>
            </div>
          </template>
          <!-- period -->
          <template #[`item.period`]="{ item }">
            <div v-for="(c, i) in item.period" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.period.length - 1"></v-divider>
            </div>
          </template>
          <!-- dynasty -->
          <template #[`item.dynasty`]="{ item }">
            <div v-for="(c, i) in item.dynasty" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.dynasty.length - 1"></v-divider>
            </div>
          </template>
          <!-- place -->
          <template #[`item.place`]="{ item }">
            <div v-for="(c, i) in item.place" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.place.length - 1"></v-divider>
            </div>
          </template>
          <!-- century -->
          <template #[`item.century`]="{ item }">
            <div v-for="(c, i) in item.century" :key="item.id + '-' + i">
              <div class="d-flex align-center" style="min-height: 43px">
                <div style="width: calc(30% - 4.5px)" class="text-truncate">
                  {{ c.language }}
                </div>
                <v-divider vertical class="mx-1" />
                <div style="width: calc(70% - 4.5px)">
                  {{ c.value }}
                </div>
              </div>
              <v-divider v-if="i < item.century.length - 1"></v-divider>
            </div>
          </template>

          <!-- Sequence Report -->
          <template #[`item.id`]="{ item }">
            <div class="d-flex align-center">
              <!-- <v-checkbox-group v-model=""> -->
              <v-checkbox
                :value="item.id"
                v-model="selected"
                @click="setMenuPosition"
              ></v-checkbox>

              <manifest-options
                v-if="selected == item.id"
                @deselect="selected = null"
                @open-meta="openMeta(item, $event)"
                @delete="openDeletePrompt(item)"
                aboslute
                :position-x="menuX"
                :position-y="menuY"
              />
              <!-- </v-checkbox-group> -->
              {{ item.id }}
            </div>
          </template>
          <template #[`item.sequenceReport`]="{ item }">
            <div
              class="d-flex align-center"
              v-for="(c, i) in item.sequenceReport"
              :key="item.id + '-' + i"
              style="min-height: 43px; max-width: 200px; height: 100%"
            >
              <div style="width: calc(50% - 4.5px)" class="text-truncate">
                <a
                  :href="c.id"
                  target="_blank"
                  :title="c.id"
                  class="text-truncate"
                >
                  {{ c.id }}
                </a>
              </div>
              <v-divider vertical class="mx-1" />
              <div style="width: calc(50% - 4.5px)">
                {{ c.totalCanvas }}
              </div>
            </div>
          </template>
        </v-data-table>

        <v-pagination
          :disabled="loading"
          v-model="page"
          :length="totalPages"
          :total-visible="7"
          class="mt-4"
        />

        <ManifestMetaData ref="meta" @update="getManifestList" />

        <base-prompt
          ref="prompt"
          @accept="deleteManifest"
          :loading="deleting"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import {
  getManifestList,
  deleteManifest,
} from "../../services/manifest.service";
import ManifestOptions from "./Options.vue";
import ManifestMetaData from "./MetaData.vue";
export default {
  name: "ManifestGrid",
  components: { ManifestOptions, ManifestMetaData },
  data() {
    return {
      filters: {
        PageSize: 20,
        PageIndex: 0,
      },
      page: 1,
      totalPages: 1,
      totalCount: 0,
      menuX: 0,
      menuY: 0,
      selected: null,
      loading: true,
      items: [],
      headers: [
        { value: "id", text: "ID", width: 240, align: "left" },
        {
          value: "manifestId",
          text: "Manifest ID",
          width: 250,
          align: "center",
        },
        {
          value: "manifestVersion",
          text: "Version",
          width: 40,
          align: "center",
        },
        {
          value: "classification",
          text: "Classification",
          width: 200,
          align: "center",
        },
        { value: "subject", text: "Subject", width: 200, align: "center" },
        { value: "technique", text: "Technique", width: 200, align: "center" },
        { value: "medium", text: "Medium", width: 200, align: "center" },
        { value: "period", text: "Period", width: 200, align: "center" },
        { value: "dynasty", text: "Dynasty", width: 200, align: "center" },
        { value: "place", text: "Place", width: 200, align: "center" },
        { value: "century", text: "Century", width: 200, align: "center" },
        {
          value: "sequenceReport",
          text: "Sequence Report",
          align: "center",
          width: 200,
        },
        { value: "culture", text: "Culture", align: "center" },
        { value: "publisher", text: "Publisher", align: "right" },
      ],

      deleting: false,
    };
  },
  created() {
    this.getManifestList();
  },
  methods: {
    openDeletePrompt(item) {
      this.$refs.prompt.open(item);
    },
    openMeta(item, type) {
      console.log(item, type);
      this.$refs.meta.open(item, type);
    },
    setMenuPosition(e) {
      console.log(e);
      this.menuX = e.pageX;
      this.menuY = e.pageY + 30;
    },
    rowClass(e) {
      return e.id === this.selected ? "blue lighten-5" : "";
    },
    async deleteManifest(item) {
      this.deleting = true;
      try {
        await deleteManifest(item.id);
        this.$toasted.success("Manifest Deleted!");
        this.$refs.prompt.close()
        this.getManifestList();
      } catch (e) {
        console.log(e);
      }
      this.deleting = false;
    },
    async getManifestList() {
      this.loading = true;
      try {
        const { result, totalPages, totalCount } = await getManifestList(
          this.filters
        );
        this.items = result;
        if (this.totalPages == 1) {
          this.totalPages = totalPages;
        }
        this.totalCount = totalCount;
      } catch (e) {
        console.log(e);
      }
      this.loading = false;
    },
  },
  watch: {
    page() {
      this.filters.PageIndex = this.page - 1;
    },
    filters: {
      deep: true,
      handler() {
        this.getManifestList();
      },
    },
  },
};
</script>
<style lang="scss">
#manifest_grid {
  .v-data-table {
    th {
      border-top: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 1rem;
      border-bottom: 2px solid rgba(0, 0, 0, 0.12) !important;
    }
    td,
    th {
      border-left: 1px solid rgba(0, 0, 0, 0.12);
      &:last-child {
        border-right: 1px solid rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>