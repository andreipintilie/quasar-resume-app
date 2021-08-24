<template>
  <div class="text-h6">
    Work history
    <q-btn
      class="q-mb-xs q-ml-xs"
      @click="promptCreate = true"
      size="xs"
      icon="add"
      round
      title="Add education"
    ></q-btn>
  </div>
  <div v-if="$store.state.workModule.work.length > 0">
    <q-item v-for="(work, idx) in $store.state.workModule.work" :key="idx">
      <q-item-section>
        <q-item-label class="text-h6">{{ work.employer }}</q-item-label>
        <q-item-label caption class="text-subtitle1">
          Position:
          <span class="text-black">{{ work.position }}</span></q-item-label
        >

        <q-item-label caption class="text-subtitle2">
          Description:
          <span class="text-black">{{ work.description }}</span></q-item-label
        >
        <q-item-label caption class="text-subtitle2"
          >Period:
          <span class="text-black">{{
            work.in_progress === false
              ? `${work.start_year} –
            ${work.end_year}`
              : `In Progress (since: ${work.start_year})`
          }}</span></q-item-label
        >
        <q-item-label class="q-pt-sm">
          <q-btn @click="editItem(work.id)" size="sm" icon="edit" round></q-btn>
          <q-btn
            @click="deleteWorkElement(work.id)"
            class="q-ml-md"
            size="sm"
            icon="delete"
            round
          ></q-btn>
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>
          {{
            work.in_progress === true ? "In Progress" : "Finished"
          }}</q-item-label
        >
      </q-item-section>
    </q-item>
  </div>
  <!-- dialog edit work start -->
  <q-dialog v-model="promptChange">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Edit:
          {{ $store.state.workModule.work[clicked].employer }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-input
            v-model="employer"
            label="Employer"
            autofocus
            @keyup.enter="promptChange = false"
          />

          <q-input
            v-model="position"
            label="Position"
            autofocus
            @keyup.enter="promptChange = false"
          />

          <q-input
            v-model="description"
            label="Job Description"
            autofocus
            @keyup.enter="promptChange = false"
          />

          <div class="row">
            <div class="col">
              <q-input
                v-model="startYear"
                type="number"
                style="max-width: 100px"
                label="Start year"
              />
            </div>
            <div v-if="inProgress === false" class="col text-right">
              <q-input
                v-model="endYear"
                type="number"
                style="max-width: 100px"
                label="End year"
              />
            </div>
          </div>

          <q-toggle
            v-model="inProgress"
            :label="inProgress === true ? 'In Progress' : 'Finished'"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- dialog edit education end -->
  <!-- dialog add education start -->
  <q-dialog v-model="promptCreate">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Add Work</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-input
            label="Employer"
            v-model="newEmployer"
            autofocus
            @keyup.enter="promptCreate = false"
          />

          <q-input
            label="Position"
            v-model="newPosition"
            autofocus
            @keyup.enter="promptCreate = false"
          />

          <q-input
            label="Job Description"
            v-model="newDescription"
            autofocus
            @keyup.enter="promptCreate = false"
          />

          <div class="row">
            <div class="col">
              <q-input
                type="number"
                style="max-width: 100px"
                label="Start year"
                v-model="newStartYear"
              />
            </div>
            <div v-if="newInProgress === false" class="col text-right">
              <q-input
                type="number"
                style="max-width: 100px"
                label="End year"
                v-model="newEndYear"
              />
            </div>
          </div>

          <q-toggle
            :label="newInProgress === true ? 'In Progress' : 'Finished'"
            v-model="newInProgress"
            :model-value="newInProgress"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn @click="addNewWork" flat label="Add" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- dialog add education end -->
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "Work",
  data() {
    return {
      $q: useQuasar(),
      $store: useStore(),
      promptCreate: false,
      promptChange: false,
      clicked: null,
      newEmployer: null,
      newPosition: null,
      newDescription: null,
      newStartYear: null,
      newEndYear: null,
      newInProgress: false,
    };
  },
  methods: {
    deleteWorkElement(payload) {
      this.$store.commit("workModule/deleteWorkElement", payload);
    },
    editItem(work_id) {
      this.promptChange = true;
      this.clicked = work_id;
      this.$store.commit("workModule/getClickedWorkElementID", work_id);
    },
    addNewWork(e) {
      e.stopImmediatePropagation();

      if (
        !this.newEmployer ||
        !this.newPosition ||
        !this.newDescription ||
        !this.newStartYear ||
        (!this.newEndYear && this.newInProgress === false)
      ) {
        this.$q.notify({
          type: "negative",
          message: "You have to fill in all the fields!",
        });

        return;
      }

      if (
        this.newEmployer.length < 4 ||
        this.newPosition.length < 4 ||
        this.newDescription.length < 4 ||
        this.newStartYear.length < 4 ||
        (this.newEndYear.length < 4 && this.newInProgress === false)
      ) {
        this.$q.notify({
          type: "negative",
          message: "Every field has to be at least 4 characters long!",
        });

        return;
      }

      if (this.newStartYear > new Date().getFullYear()) {
        this.$q.notify({
          type: "negative",
          message: "The start year cannot be greater than the current year!",
        });

        return;
      }

      this.$store.commit("workModule/addWork", {
        id: this.$store.state.workModule.work.length,
        employer: this.newEmployer,
        position: this.newPosition,
        description: this.newDescription,
        start_year: this.newStartYear,
        end_year: this.newEndYear,
        in_progress: this.newInProgress,
      });
      this.newEmployer = null;
      this.newPosition = null;
      this.newDescription = null;
      this.newStartYear = null;
      this.newEndYear = null;
      this.newInProgress = false;
    },
  },
  computed: {
    employer: {
      get() {
        return this.$store.state.workModule.work[this.clicked].employer;
      },
      set(payload) {
        this.$store.commit("workModule/setEmployer", payload);
      },
    },
    position: {
      get() {
        return this.$store.state.workModule.work[this.clicked].position;
      },
      set(payload) {
        this.$store.commit("workModule/setPosition", payload);
      },
    },
    description: {
      get() {
        return this.$store.state.workModule.work[this.clicked].description;
      },
      set(payload) {
        this.$store.commit("workModule/setDescription", payload);
      },
    },
    startYear: {
      get() {
        return this.$store.state.workModule.work[this.clicked].start_year;
      },
      set(payload) {
        this.$store.commit("workModule/setStartYear", payload);
      },
    },
    endYear: {
      get() {
        return this.$store.state.workModule.work[this.clicked].end_year;
      },
      set(payload) {
        this.$store.commit("workModule/setEndYear", payload);
      },
    },
    inProgress: {
      get() {
        return this.$store.state.workModule.work[this.clicked].in_progress;
      },
      set(payload) {
        this.$store.commit("workModule/setInProgress", payload);
      },
    },
  },
};
</script>
