export function onReset(state) {
  state.firstname = "";
  state.lastname = "";
  state.email = "";
  state.phone = "";
  state.location = "";
  state.website = "";
}

export function setFirstName(state, payload) {
  state.firstname = payload;
}

export function setLastName(state, payload) {
  state.lastname = payload;
}

export function setEmail(state, payload) {
  state.email = payload;
}

export function setPhone(state, payload) {
  state.phone = payload;
}

export function setLocation(state, payload) {
  state.location = payload;
}

export function setWebsite(state, payload) {
  state.website = payload;
}

export function setGithub(state, payload) {
  state.github = payload;
}
