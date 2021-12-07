import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export type orderType = 'grid'|'list'

export type State = {
  order: orderType
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    order: 'grid',
  },
  mutations: {
    changeOrderType (state, orderType: orderType) {
      state.order = orderType
    }
  }
})