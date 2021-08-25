export function addNewProject(state, payload) {
  state.projects.push(payload);
}

export function removeProject(state, payload) {
  for (let i = 0; i < state.projects.length; i++) {
    if (state.projects[i].id === payload) {
      state.projects.splice(i, 1);
      break;
    }
  }
}

export function setClickedProject(state, payload) {
  state.clickedProject = payload;
}

export function setProjectTitle(state, payload) {
  state.projects[state.clickedProject].title = payload;
}

export function setProjectDescription(state, payload) {
  state.projects[state.clickedProject].description = payload;
}

export function setProjectLink(state, payload) {
  state.projects[state.clickedProject].link = payload;
}

export function setProjectDemoLink(state, payload) {
  state.projects[state.clickedProject].demo_link = payload;
}
