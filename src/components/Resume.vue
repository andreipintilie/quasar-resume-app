<template>
  <div id="resume">
    <div class="row">
      <div class="col-4 text-left">
        {{ $store.state.personalInfoModule.location }} <br />
        <a
          v-if="$store.state.personalInfoModule.github"
          :href="$store.state.personalInfoModule.github"
          >{{ $store.state.personalInfoModule.github }}</a
        >
      </div>
      <div class="col-4 text-body1 text-uppercase">
        {{ $store.state.personalInfoModule.firstname }} <br />
        {{ $store.state.personalInfoModule.lastname }}
      </div>
      <div class="col-4 text-right">
        {{ $store.state.personalInfoModule.phone }} <br />
        <a :href="$store.state.personalInfoModule.website">{{
          $store.state.personalInfoModule.website
        }}</a>
      </div>
    </div>
    <div class="section-heading text-left q-mt-md">Employment</div>
    <div
      class="row q-pb-lg"
      v-for="work in $store.state.workModule.work"
      :key="work.id"
    >
      <div class="col-4 font-weight-bold text-left">
        {{ work.position }}
      </div>
      <div class="col-4 font-weight-bold">
        {{ work.employer }}
      </div>
      <div class="col-4 font-weight-bold text-right">
        {{
          work.in_progress === true
            ? `${work.start_month} ${work.start_year} - Present`
            : `${work.start_month} ${work.start_year} - ${work.end_month} ${work.end_year}`
        }}
      </div>
      <div class="col-12 text-left">
        {{ work.description }}
      </div>
    </div>
    <div class="section-heading text-left q-mt-md">Education</div>
    <div
      class="row q-pb-lg"
      v-for="school in $store.state.educationModule.education"
      :key="school.id"
    >
      <div class="col-4 font-weight-bold text-left">
        {{ school.university }}
      </div>
      <div class="col-4 font-weight-bold">
        {{ school.faculty }}
      </div>
      <div class="col-4 font-weight-bold text-right">
        {{
          school.in_progress === true
            ? `${school.start_year} - Present`
            : `${school.start_year} - ${school.end_month}`
        }}
      </div>
    </div>
    <div class="section-heading text-left q-mt-md">Projects</div>
    <ul class="text-left">
      <li
        class="q-pb-xs"
        v-for="project in $store.state.projectsModule.projects"
        :key="project.id"
      >
        <span class="font-weight-bold">{{ project.title }}</span> –
        {{ project.description }}
        <p>
          Project Link: <a :href="project.link">{{ project.link }}</a> <br />
          <span v-show="project.demo_link"
            >Project Link:
            <a :href="project.demo_link">{{ project.demo_link }}</a></span
          >
        </p>
      </li>
    </ul>

    <!-- <div class="text-h6">Work History</div>
    <q-timeline
      color="secondary"
      class="q-px-lg q-pb-md"
      v-for="work in $store.state.workModule.work"
      v-bind:key="work.id"
    >
      <q-timeline-entry
        :title="work.employer"
        :subtitle="
          work.in_progress === false
            ? `${work.start_month} ${work.start_year} - ${work.end_month} ${work.end_year}`
            : `In Progress (Since: ${work.start_month} ${work.start_year})`
        "
        color="primary"
        icon="list"
        :body="work.description"
      />
      <div class="q-timeline-border"></div>
    </q-timeline> -->
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "Resume",
  data() {
    return {
      $store: useStore(),
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#resume {
  * {
    font-family: "Open Sans", sans-serif;
  }

  a {
    color: #375fff;
  }

  text-align: center;

  .section-heading {
    text-transform: uppercase;
    font-weight: bold;
    border-bottom: 1px solid black;
  }
}

.q-timeline {
  margin-inline: auto;
  width: 50% !important;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
