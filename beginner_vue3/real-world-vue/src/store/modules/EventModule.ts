import EventsService from '@/services/EventsService';
import { ActionContext, Commit, Store } from 'vuex';

export interface Event {
  id: number;
  title: string;
  time: string;
  date: string;
  location: string;
  description: string;
}

export interface EventState {
  events: Event[];
}

const module = {
  namespaced: true,
  state: {
    events: <Event[]>[],
  },
  actions: {
    async getEvents({ commit }: { commit: Commit }) {
      if (module.state.events.length > 0) return module.state.events;
      try {
        const { data } = await EventsService.getEvents();
        commit('SET_EVENTS', data);
        return data;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
    async getEventById(
      context: ActionContext<EventState, EventState>,
      { id }: { id: number }
    ) {
      const event = module.state.events.find((event) => event.id == id);
      if (event) return event;
      try {
        const { data } = await EventsService.getEventById(id);
        return data;
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
  mutations: {
    SET_EVENTS(state: EventState, payload: Event[]) {
      state.events = payload;
    },
  },
};

export default module;
