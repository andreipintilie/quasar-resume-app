export function deleteWorkElement(state, payload) {
  for (let i = 0; i < state.work.length; i++) {
    if (state.work[i].id === payload) {
      state.work.splice(i, 1);
      break;
    }
  }
}

export function getClickedWorkElementID(state, payload) {
  state.clickedWork = payload;
}

export function addWork(state, payload) {
  state.work.push(payload);
}

export function setEmployer(state, payload) {
  state.work[state.clickedWork].employer = payload;
}

export function setPosition(state, payload) {
  state.work[state.clickedWork].position = payload;
}

export function setDescription(state, payload) {
  state.work[state.clickedWork].description = payload;
}

export function setStartMonth(state, payload) {
  state.work[state.clickedWork].start_month = payload;
}

export function setStartYear(state, payload) {
  state.work[state.clickedWork].start_year = payload;
}

export function setEndMonth(state, payload) {
  state.work[state.clickedWork].end_month = payload;
}

export function setEndYear(state, payload) {
  state.work[state.clickedWork].end_year = payload;
}

export function setInProgress(state, payload) {
  state.work[state.clickedWork].in_progress = payload;
}
