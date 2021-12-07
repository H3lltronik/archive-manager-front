import { store, themeType } from "../store";

const html = document.querySelector('html');

export const switchTheme = function (theme : themeType) {
    if (html) html.dataset.theme = `${theme}`;

    store.commit('setTheme', theme);
}