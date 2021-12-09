import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { doSearch, doSearchByName, getFiles } from "../api";

export type orderType = "grid" | "list";
export type themeType = "theme-dark" | "theme-light";

export type State = {
  order: orderType;
  uploadModalOpened: boolean;
  loading: boolean;
  searchMode: boolean;
  theme: themeType;
  user: User | null;
  allFiles: FileCreationRes[];
  selectedFiles: FileCreationRes[];
  filesByName: FileCreationRes[];
  filesByContent: FileCreationRes[];
  filters: number[];
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    order: "grid",
    theme: "theme-dark",
    uploadModalOpened: false,
    loading: true,
    searchMode: false,
    user: null,
    filters: [],
    allFiles: [],
    selectedFiles: [],
    filesByName: [],
    filesByContent: [],
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
    setSearchMode(state, payload: boolean) {
      state.searchMode = payload;
    },
    setTheme(state, payload: themeType) {
      state.theme = payload;
    },
    setUser(state, payload: User) {
      state.user = payload;
    },
    setAllFiles(state, payload: FileCreationRes[]) {
      state.allFiles = payload;
    },
    setFilesByName(state, payload: FileCreationRes[]) {
      state.filesByName = payload;
    },
    setFilesByContent(state, payload: FileCreationRes[]) {
      state.filesByContent = payload;
    },
    setFilters(state, payload: number[]) {
      state.filters = payload;
    },
    setSelectedFiles(state, payload: FileCreationRes[]) {
      state.selectedFiles =payload;
    },
    addSelectedFile(state, payload: FileCreationRes) {
      state.selectedFiles.push(payload);
    },
    removeSelectedFile(state, payload: FileCreationRes) {
      state.selectedFiles.splice(
        state.selectedFiles.findIndex((file) => file.id == payload.id),
        1
      );
    },
  },
  actions: {
    async fetchAllFiles({ commit }, search = " ") {
      commit("setLoading", true);
      const files = (await getFiles()).data ?? [];
      commit("setAllFiles", files);
      commit("setSelectedFiles", []);
      commit("setLoading", false);
    },
    async fetchFilesByContent({ commit }, search = " ") {
      commit("setLoading", true);
      const files = (await doSearch(search)).data ?? [];
      commit("setFilesByContent", files);
      commit("setSelectedFiles", []);
      commit("setLoading", false);
    },
    async fetchFilesByName({ commit }, search = " ") {
      commit("setLoading", true);
      const files = (await doSearchByName(search)).data ?? [];
      commit("setFilesByName", files);
      commit("setSelectedFiles", []);
      commit("setLoading", false);
    },
  },
  getters: {
    getFilteredFiles({ filters, allFiles }) {
      if (filters.length <= 0) return allFiles;

      return allFiles.filter((file) => {
        return filters.some((filter) => filter == file.level);
      });
    },
    getFilteredFilesByContent({ filters, filesByContent }) {
      if (filters.length <= 0) return filesByContent;

      return filesByContent.filter((file) => {
        return filters.some((filter) => filter == file.level);
      });
    },
    getFilteredFilesByName({ filters, filesByName }) {
      if (filters.length <= 0) return filesByName;

      return filesByName.filter((file) => {
        return filters.some((filter) => filter == file.level);
      });
    },
  },
});
