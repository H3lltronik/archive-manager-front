import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { getFiles } from "../api";

export type orderType = "grid" | "list";
export type themeType = "theme-dark" | "theme-light";

export type State = {
  order: orderType;
  uploadModalOpened: boolean;
  theme: themeType;
  user: User | null;
  files: FileCreationRes[];
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    order: "grid",
    theme: "theme-dark",
    uploadModalOpened: false,
    user: null,
    files: [],
  },
  mutations: {
    changeOrderType(state, orderType: orderType) {
      state.order = orderType;
    },
    setUploadModal(state, payload: boolean) {
      state.uploadModalOpened = payload;
    },
    setTheme(state, payload: themeType) {
      state.theme = payload;
    },
    setUser(state, payload: User) {
      console.log("payload", payload);
      state.user = payload;
    },
    setFiles(state, payload: FileCreationRes[]) {
      state.files = payload;
    },
  },
  actions: {
    async fetchFiles({ commit }, search) {
      console.log("params", search)
      const files = (await getFiles()).data ?? [];
      commit("setFiles", files);
    },
  },
});
