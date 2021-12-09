export const DARK_THEME = "theme-dark";
export const LIGHT_THEME = "theme-light";

export const API_URL = "http://localhost:4000";

export const SUPPORTED_MIMETYPES = [
  "application/pdf",
  "text/plain",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const ROUTES = {
  LOGIN: {
    name: "Login",
    route: "/",
    meta: {
      isProtected: false,
    },
  },
  RECOVERY: {
    name: "Recover",
    route: "/recover",
    meta: {
      isProtected: false,
    },
  },
  HOME: {
    name: "Home",
    route: "/home",
    meta: {
      isProtected: true,
    },
  },
  REGISTER: {
    name: "Register",
    route: "/register",
    meta: {
      isProtected: false,
    },
  },
};
