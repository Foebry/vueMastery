import EventService from '@/services/EventService';

export const namespaced = true;

export const state = {
  count: 0,
  totalEvents: 0,
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false },
    { id: 3, text: '...', done: true },
    { id: 4, text: '...', done: false },
  ],
  events: [],
  event: {},
};

export const mutations = {
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
};

export const getters = {
  catLength: (state) => state.categories.length,
  getEventById: (state) => (id) =>
    state.events.find((event) => event.id === id),
  getTotalEvents: (state) => state.totalEvents,
};

export const actions = {
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
};
