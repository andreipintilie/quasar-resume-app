<template>
  <div>
    <q-form @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="firstname"
        label="First Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="lastname"
        label="Last Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="email"
        label="E-Mail"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="phone"
        label="Phone No."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="location"
        label="City"
        lazy-rules
        hint="Eg.: Bucharest, Romania"
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        v-model="website"
        label="Website"
        hint="Personal Website, Github, etc..."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </q-form>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "PersonalInfo",
  data() {
    return {
      $store: useStore(),
    };
  },
  methods: {
    onReset() {
      this.$store.commit("personalInfoModule/onReset");
    },
  },
  computed: {
    firstname: {
      get() {
        return this.$store.state.personalInfoModule.firstname;
      },
      set(payload) {
        this.$store.commit("personalInfoModule/setFirstName", payload);
      },
    },
    lastname: {
      get() {
        return this.$store.state.personalInfoModule.lastname;
      },
      set(payload) {
        this.$store.commit("personalInfoModule/setLastName", payload);
      },
    },
    email: {
      get() {
        return this.$store.state.personalInfoModule.email;
      },
      set(payload) {
        this.$store.commit("personalInfoModule/setEmail", payload);
      },
    },
    phone: {
      get() {
        return this.$store.state.personalInfoModule.phone;
      },
      set(payload) {
        this.$store.commit("personalInfoModule/setPhone", payload);
      },
    },
    location: {
      get() {
        return this.$store.state.personalInfoModule.location;
      },
      set(payload) {
        this.$store.commit("personalInfoModule/setLocation", payload);
      },
    },
    website: {
      get() {
        return this.$store.state.personalInfoModule.website;
      },
      set(payload) {
        this.$store.commit("personalInfoModule/setWebsite", payload);
      },
    },
  },
};
</script>
