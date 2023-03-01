export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  }, //再去actions.js,
  setCoaches(state, payload) {
    state.coaches = payload;
  },
};
