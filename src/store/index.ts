import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { doSearch, getFiles } from "../api";

export type orderType = "grid" | "list";
export type themeType = "theme-dark" | "theme-light";

export type State = {
  order: orderType;
  uploadModalOpened: boolean;
  loading: boolean;
  theme: themeType;
  user: User | null;
  files: FileCreationRes[];
  filters: number[];
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    order: "grid",
    theme: "theme-dark",
    uploadModalOpened: false,
    loading: true,
    user: null,
    files: [],
    filters: [],
  },
  mutations: {
    changeOrderType(state, orderType: orderType) {
      state.order = orderType;
    },
    setUploadModal(state, payload: boolean) {
      state.uploadModalOpened = payload;
    },
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
    setTheme(state, payload: themeType) {
      state.theme = payload;
    },
    setUser(state, payload: User) {
      state.user = payload;
    },
    setFiles(state, payload: FileCreationRes[]) {
      state.files = payload;
    },
    setFilters(state, payload: number[]) {
      state.filters = payload;
    },
  },
  actions: {
    async fetchFiles({ commit }, search = ' ') {
      commit('setLoading', true);
      const files = (await doSearch(search)).data ?? [];
      commit("setFiles", files);
      commit('setLoading', false);
    },
  },
  getters: {
    getFilteredFiles({filters, files}) {
      if (filters.length <= 0) return files

      return files.filter(file => {
        return filters.some(filter => filter == file.level)
      })
    },
  }
});
