export function removeEducationItem(state, payload) {
  for (let i = 0; i < state.education.length; i++) {
    if (state.education[i].id === payload) {
      state.education.splice(i, 1);
      break;
    }
  }
}

export function setClickedEducation(state, payload) {
  state.clickedEducation = payload;
}

export function addEducation(state, payload) {
  state.education.push(payload);
}

export function setUniversity(state, payload) {
  state.education[state.clickedEducation].university = payload;
}

export function setFaculty(state, payload) {
  state.education[state.clickedEducation].faculty = payload;
}

export function setFieldOfStudies(state, payload) {
  state.education[state.clickedEducation].field = payload;
}

export function setStartYear(state, payload) {
  state.education[state.clickedEducation].start_year = payload;
}

export function setEndYear(state, payload) {
  state.education[state.clickedEducation].end_year = payload;
}

export function switchInProgress(state, payload) {
  state.education[state.clickedEducation].in_progress = payload;
}
