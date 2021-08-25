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
