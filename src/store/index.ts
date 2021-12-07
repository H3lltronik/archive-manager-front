import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export type orderType = 'grid'|'list'

export type State = {
  order: orderType,
  uploadModalOpened: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    order: 'grid',
    uploadModalOpened: true
  },
  mutations: {
    changeOrderType (state, orderType: orderType) {
      state.order = orderType
    },
    setUploadModal (state, payload: boolean) {
      state.uploadModalOpened = payload
    },
  }
})