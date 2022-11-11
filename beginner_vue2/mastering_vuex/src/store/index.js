import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123',
      name: 'Sander Fabry',
    },
    count: 0,
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
    ],
    events: [
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' },
    ],
  },
  getters: {
    catLength: (state) => state.categories.length,
    doneTodos: (state) => state.todos.filter((todo) => todo.done),
    activeTodos: (state) => state.todos.filter((todo) => !todo.done),
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit('INCRMENT_COUNT', value);
      }
    },
    async createEvent({ commit }, event) {
      const { data } = await EventService.postEvent(event);
      if (data) {
        commit('ADD_EVENT', event);
        return { success: true };
      }
      return { success: false };
    },
  },
  modules: {},
});
