import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user';
import * as event from '@/store/modules/event';
import * as notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  getters: {
    catLength: (state) => state.categories.length,
    doneTodos: (state) => state.todos.filter((todo) => todo.done),
    activeTodos: (state) => state.todos.filter((todo) => !todo.done),
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value;
    },
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit('INCRMENT_COUNT', value);
      }
    },
  },
  modules: { user, event, notification },
});
