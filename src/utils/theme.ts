const html = document.querySelector('html');

export const switchTheme = function (theme : string) {
    if (html) html.dataset.theme = `${theme}`;
}