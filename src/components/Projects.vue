<template>
  <div class="row">
    <div class="col-6">
      <div class="text-h6">Add your projects</div>
      <p class="text-body2">
        In order to add a project, you have to fill in the form and press
        proceed.
      </p>
      <div v-if="getAllProjects" id="projects">
        <q-item v-for="project in getAllProjects" :key="project.id" clickable>
          <q-item-section>
            <q-item-label>
              <div class="text-h6">{{ project.title }}</div>
              <div class="text-body2">
                {{ project.description }}
              </div>
              <div class="text-body2">
                Project Link:
                <a :href="project.link" target="_blank">{{ project.link }}</a>
              </div>
              <div class="text-body2">
                Live Demo:
                <a :href="project.demo_link" target="_blank">{{
                  project.demo_link
                }}</a>
              </div>
              <div class="q-mt-md q-pb-lg">
                <q-btn size="sm" icon="edit" round
                  ><q-tooltip class="bg-black text-body2" :offset="[10, 10]">
                    Edit Project
                  </q-tooltip></q-btn
                >
                <q-btn
                  @click="deleteProject(project.id)"
                  class="q-ml-md"
                  size="sm"
                  icon="delete"
                  round
                  ><q-tooltip class="bg-black text-body2" :offset="[10, 10]">
                    Remove Project
                  </q-tooltip></q-btn
                >
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <div class="col-6">
      <div class="box">
        <div class="text-outline text-grey q-pb-md text-uppercase">
          Add project
        </div>
        <q-form class="q-gutter-md">
          <q-input label="Project Title" v-model="newTitle" lazy-rules />
          <q-input
            label="Project Description"
            v-model="newDescription"
            type="textarea"
            lazy-rules
            rows="5"
          />
          <q-input label="Project Link" v-model="newLink" lazy-rules />
          <q-input
            label="Live Demo Link (Optional)"
            v-model="newDemoLink"
            lazy-rules
          />
          <q-btn
            @click="AddNewProject"
            color="primary"
            label="Add Project"
            icon="star"
          />
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  name: "Projects",
  data() {
    return {
      $store: useStore(),
      $q: useQuasar(),
      newTitle: "",
      newDescription: "",
      newLink: "",
      newDemoLink: "",
    };
  },
  methods: {
    AddNewProject() {
      if (!this.newTitle || !this.newDescription || !this.newLink)
        return this.$q.notify({
          type: "negative",
          message: "You have to fill in all the fields!",
        });

      if (
        this.newTitle.length < 3 ||
        this.newDescription.length < 3 ||
        this.newLink.length < 3 ||
        (this.newDemoLink && this.newDemoLink.length < 3)
      )
        return this.$q.notify({
          type: "negative",
          message: "You have type in at least 3 characters!",
        });

      this.$q.notify({
        type: "positive",
        message: "Project added successfully!",
      });

      this.$store.commit("projectsModule/addNewProject", {
        id: this.getAllProjects.length,
        title: this.newTitle,
        description: this.newDescription,
        link: this.newLink,
        demo_link: this.newDemoLink,
      });

      this.newTitle = null;
      this.newDescription = null;
      this.newLink = null;
      this.newDemoLink = null;
    },
    deleteProject(id) {
      this.$store.commit("projectsModule/removeProject", id);
    },
  },
  computed: {
    getAllProjects() {
      return this.$store.getters["projectsModule/getAllProjects"];
    },
  },
};
</script>

<style lang="scss" scoped>
.q-item__section a {
  color: #375fff;
}

.box {
  float: right;
  border-radius: 0.6rem;
  padding: 1rem;
  width: 80%;
  margin-inline: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);
}
#projects {
  white-space: pre-line;
}
</style>
