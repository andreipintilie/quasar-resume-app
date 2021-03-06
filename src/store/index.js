import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import personalInfoModule from "./personal-info-module";
import educationModule from "./education-module";
import workModule from "./work-module";
import projectsModule from "./projects-module";

// import example from './module-example'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      personalInfoModule,
      educationModule,
      workModule,
      projectsModule,
    },
    strict: process.env.DEBUGGING,
  });

  return Store;
});
