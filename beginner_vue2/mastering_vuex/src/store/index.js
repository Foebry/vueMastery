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
    totalEvents: 0,
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
    events: [],
    event: {},
  },
  getters: {
    catLength: (state) => state.categories.length,
    doneTodos: (state) => state.todos.filter((todo) => todo.done),
    activeTodos: (state) => state.todos.filter((todo) => !todo.done),
    getEventById: (state) => (id) =>
      state.events.find((event) => event.id === id),
    getTotalEvents: (state) => state.totalEvents,
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL_EVENTS(state, total) {
      state.totalEvents = total;
    },
    SET_EVENT(state, event) {
      state.event = event;
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
    async fetchEvents({ commit }, { perPage, page }) {
      const response = await EventService.getEvents(perPage, page);
      if (response.data) {
        commit('SET_TOTAL_EVENTS', parseInt(response.headers['x-total-count']));
        commit('SET_EVENTS', response.data);
      } else if (response.error) {
        console.log(response.error.message);
      }
    },
    async fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id);
      console.log(event);
      if (event) commit('SET_EVENT', event);
      else {
        const { data } = await EventService.getEvent(id);
        if (data) commit('SET_EVENT', data);
        else console.log(`Encountered an error while fetching event ${id}`);
      }
    },
  },
  modules: {},
});
