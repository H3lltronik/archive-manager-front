export const DARK_THEME = "theme-dark";
export const LIGHT_THEME = "theme-light";

export const API_URL = "http://localhost:4000";
// export const API_URL = process.env.API_URL || "http://18.116.238.128:4000";

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
  DORECOVERY: {
    name: "DoRecover",
    route: "/do-recover/:token",
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
  ANALISIS: {
    name: "Analisis",
    route: "/analisis",
    meta: {
      isProtected: true,
    },
  },
};
