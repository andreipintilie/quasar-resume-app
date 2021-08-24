<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" id="q-stepper">
      <q-stepper v-model="step" ref="stepper" color="primary" animated>
        <q-step
          :name="1"
          title="Personal Informations"
          icon="user"
          :done="step > 1"
        >
          <personal-info></personal-info>

          <q-stepper-navigation>
            <q-btn
              @click="slideToWorkAndEducation"
              @dblclick="step = 2"
              color="primary"
              label="Continue"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Education & Work"
          icon="business"
          :done="step > 2"
        >
          <!-- <div class="row">
            <div class="col"><work></work></div>
            <div class="col"><education></education></div>
          </div> -->
          <work></work>
          <education></education>

          <q-stepper-navigation>
            <q-btn
              @click="slideToProjectsAndHighlights"
              color="primary"
              label="Continue"
            />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Projects & Highlights"
          icon="folder"
          :done="step > 3"
        >
          hi there!

          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="Continue" />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="Preview & Download" icon="save_alt">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, omnis.

          <q-stepper-navigation>
            <q-btn color="primary" label="Finish" />
            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
// Dependencies
import { defineComponent } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
// import VueHtml2pdf from 'vue-html2pdf';

// Components
import PersonalInfo from "../components/PersonalInfo.vue";
import Education from "../components/Education.vue";
import Work from "../components/Work.vue";

export default defineComponent({
  name: "PageIndex",
  components: {
    PersonalInfo,
    Education,
    Work,
  },
  data() {
    return {
      $store: useStore(),
      step: ref(1),
      $q: useQuasar(),
    };
  },
  methods: {
    slideToWorkAndEducation() {
      if (
        !this.$store.state.personalInfoModule.firstname ||
        !this.$store.state.personalInfoModule.lastname ||
        !this.$store.state.personalInfoModule.email ||
        !this.$store.state.personalInfoModule.phone ||
        !this.$store.state.personalInfoModule.location ||
        !this.$store.state.personalInfoModule.website
      )
        return this.$q.notify({
          type: "negative",
          message: "You have to fill in all the fields.",
        });
      this.step = 2;
    },
    slideToProjectsAndHighlights() {
      console.log(
        this.$store.state.educationModule.education,
        this.$store.state.workModule.work
      );
      if (
        this.$store.state.educationModule.education.length === 0 ||
        this.$store.state.workModule.work.length === 0
      ) {
        this.$q.notify({
          type: "negative",
          message: "You have to fill in all the fields.",
        });
        return;
      }
      this.step = 3;
    },
  },
});
</script>
