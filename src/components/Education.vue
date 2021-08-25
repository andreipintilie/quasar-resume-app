<template>
  <div class="text-h6">
    Education
    <q-btn
      class="q-mb-xs q-ml-xs"
      @click="promptCreate = true"
      size="xs"
      icon="add"
      round
    >
      <q-tooltip class="bg-black text-body2" :offset="[10, 10]">
        Add education
      </q-tooltip></q-btn
    >
  </div>
  <div v-if="$store.state.educationModule.education.length > 0">
    <q-item
      v-for="(school, idx) in $store.state.educationModule.education"
      :key="idx"
    >
      <q-item-section>
        <q-item-label class="text-h6">{{ school.university }}</q-item-label>
        <q-item-label caption lines="2" class="text-subtitle1">{{
          school.faculty
        }}</q-item-label>
        <q-item-label caption lines="2" class="text-subtitle2">{{
          school.field
        }}</q-item-label>
        <q-item-label caption lines="2" class="text-subtitle2"
          >Period: {{ school.start_year }} – {{ school.end_year }}</q-item-label
        >
        <q-item-label class="q-pt-sm">
          <q-btn @click="editItem(school.id)" size="sm" icon="edit" round>
            <q-tooltip class="bg-black text-body2" :offset="[10, 10]">
              Edit School
            </q-tooltip>
          </q-btn>
          <q-btn
            @click="removeEducationItem(school.id)"
            class="q-ml-md"
            size="sm"
            icon="delete"
            round
          >
            <q-tooltip class="bg-black text-body2" :offset="[10, 10]">
              Remove School
            </q-tooltip>
          </q-btn>
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-item-label caption>
          {{
            school.in_progress === true ? "In Progress" : "Finished"
          }}</q-item-label
        >
      </q-item-section>
    </q-item>
  </div>
  <!-- dialog edit education start -->
  <q-dialog v-model="promptChange">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Edit:
          {{ $store.state.educationModule.education[clicked].university }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-input
            label="University"
            v-model="university"
            autofocus
            @keyup.enter="promptChange = false"
          />

          <q-input
            label="Faculty"
            v-model="faculty"
            autofocus
            @keyup.enter="promptChange = false"
          />

          <q-input
            label="Field of studies"
            v-model="field"
            autofocus
            @keyup.enter="promptChange = false"
          />

          <div class="row">
            <div class="col">
              <q-input
                v-model.number="startYear"
                type="number"
                style="max-width: 100px"
                label="Start year"
              />
            </div>
            <div v-show="in_progress === true" class="col text-right">
              <q-input
                v-model.number="endYear"
                type="number"
                style="max-width: 100px"
                label="End year"
              />
            </div>
          </div>

          <q-toggle
            v-model="in_progress"
            :label="in_progress === true ? 'In Progress' : 'Finished'"
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
        <div class="text-h6">Add Education</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md">
          <q-input
            label="University"
            v-model="newUniversity"
            autofocus
            @keyup.enter="promptCreate = false"
          />

          <q-input
            label="Faculty"
            v-model="newFaculty"
            autofocus
            @keyup.enter="promptCreate = false"
          />

          <q-input
            label="Field of studies"
            v-model="newField"
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
            <div v-show="newInProgress === false" class="col text-right">
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
        <q-btn @click="addNewEducation" flat label="Add" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- dialog add education end -->
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "Education",
  data() {
    return {
      promptChange: false,
      promptCreate: false,
      $store: useStore(),
      $q: useQuasar(),
      clicked: null,
      newUniversity: null,
      newFaculty: null,
      newField: null,
      newStartYear: null,
      newEndYear: null,
      newInProgress: false,
    };
  },
  methods: {
    removeEducationItem(payload) {
      this.$store.commit("educationModule/removeEducationItem", payload);
    },
    editItem(school_id) {
      this.promptChange = true;
      this.clicked = school_id;
      this.$store.commit("educationModule/setClickedEducation", school_id);
    },
    addNewEducation(e) {
      e.stopImmediatePropagation();

      if (this.newInProgress === true) {
        this.newEndYear = 0;
      }

      if (
        !this.newUniversity ||
        !this.newFaculty ||
        !this.newField ||
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
        this.newUniversity.length < 4 ||
        this.newFaculty.length < 4 ||
        this.newField.length < 4 ||
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

      this.$store.commit("educationModule/addEducation", {
        id: this.$store.state.educationModule.education.length,
        university: this.newUniversity,
        faculty: this.newFaculty,
        field: this.newField,
        start_year: this.newStartYear,
        end_year: this.newEndYear,
        in_progress: this.newInProgress,
      });
      this.newUniversity = null;
      this.newFaculty = null;
      this.newField = null;
      this.newStartYear = null;
      this.newEndYear = null;
      this.newInProgress = false;
    },
  },
  computed: {
    university: {
      get() {
        return this.$store.state.educationModule.education[this.clicked]
          .university;
      },
      set(payload) {
        this.$store.commit("educationModule/setUniversity", payload);
      },
    },
    faculty: {
      get() {
        return this.$store.state.educationModule.education[this.clicked]
          .faculty;
      },
      set(payload) {
        this.$store.commit("educationModule/setFaculty", payload);
      },
    },
    field: {
      get() {
        return this.$store.state.educationModule.education[this.clicked].field;
      },
      set(payload) {
        this.$store.commit("educationModule/setFieldOfStudies", payload);
      },
    },
    startYear: {
      get() {
        return this.$store.state.educationModule.education[this.clicked]
          .start_year;
      },
      set(payload) {
        this.$store.commit("educationModule/setStartYear", payload);
      },
    },
    endYear: {
      get() {
        return this.$store.state.educationModule.education[this.clicked]
          .end_year;
      },
      set(payload) {
        this.$store.commit("educationModule/setEndYear", payload);
      },
    },
    in_progress: {
      get() {
        return this.$store.state.educationModule.education[this.clicked]
          .in_progress;
      },
      set(payload) {
        this.$store.commit("educationModule/switchInProgress", payload);
      },
    },
  },
};
</script>
