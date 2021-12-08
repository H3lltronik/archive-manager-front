import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export type orderType = 'grid'|'list'
export type themeType = 'theme-dark'|'theme-light'

export type State = {
  order: orderType,
  uploadModalOpened: boolean,
  theme: themeType,
  user: User|null,
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    order: 'grid',
    theme: 'theme-dark',
    uploadModalOpened: false,
    user: null,
  },
  mutations: {
    changeOrderType (state, orderType: orderType) {
      state.order = orderType
    },
    setUploadModal (state, payload: boolean) {
      state.uploadModalOpened = payload
    },
    setTheme (state, payload: themeType) {
      state.theme = payload
    },
    setUser (state, payload: User) {
      console.log("payload", payload)
      state.user = payload
    },
  }
})