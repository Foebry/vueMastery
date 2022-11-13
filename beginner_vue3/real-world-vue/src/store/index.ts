import { createStore, Store } from 'vuex';
import EventModule, { EventState } from '@/store/modules/EventModule';

const store: Store<EventState> = createStore({
  modules: { event: EventModule },
});
// store.registerModule('@/store/modules/EventModule', EventModule);
// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

export default store;
