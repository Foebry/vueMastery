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
  getEventById: (state) => (id) =>
    state.events.find((event) => event.id === id),
  getTotalEvents: (state) => state.totalEvents,
};

export const actions = {
  async createEvent({ commit, dispatch }, event) {
    try {
      const { data } = await EventService.postEvent(event);
      if (data) {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Event created',
        };
        dispatch('notification/add', notification, { root: true });
        return { success: true };
      }
    } catch (e) {
      const notification = {
        type: 'error',
        message: e.message,
      };
      dispatch('notification/add', notification, { root: true });
      throw e;
    }
  },
  async fetchEvents({ commit, dispatch }, { perPage, page }) {
    try {
      const response = await EventService.getEvents(perPage, page);
      if (response.data) {
        //   console.log(response.data);
        commit('SET_TOTAL_EVENTS', parseInt(response.headers['x-total-count']));
        commit('SET_EVENTS', response.data);
      }
    } catch (e) {
      const notification = {
        type: 'error',
        message: e.message,
      };
      dispatch('notification/add', notification, { root: true });
    }
  },
  async fetchEvent({ commit, getters, dispatch }, id) {
    const event = getters.getEventById(id);
    if (event) commit('SET_EVENT', event);
    else {
      try {
        const { data } = await EventService.getEvent(id);
        if (data) commit('SET_EVENT', data);
      } catch (e) {
        const notification = {
          type: 'error',
          message: e.message,
        };
        dispatch('notification/add', notification, { root: true });
      }
    }
  },
};
