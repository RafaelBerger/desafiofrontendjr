import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const savedLang = localStorage.getItem("lang") || "pt";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: {
        loginTitle: "Bem Vindo",
        loginText:
          "Simplifique sua comunicação. Onde cada mensagem encontra o seu lugar.",
        userLoginText: "Login de usuário",
        password: "Senha",
        dark: "Escuro",
        light: "Claro",
        search: "Pesquisar",
        assign: "Atribuir",
        archive: "Arquivar",
        schedule: "Agendar",
        today: "Hoje",
        profile: "PERFIL",
        logout: "SAIR",
      },
    },
    en: {
      translation: {
        loginTitle: "Welcome",
        loginText: "Simplify communication. Where every message belongs.",
        userLoginText: "User Login",
        password: "Password",
        dark: "Dark",
        light: "Light",
        search: "Search",
        assign: "Assign",
        archive: "Archive",
        schedule: "Schedule",
        today: "Today",
        profile: "PROFILE",
        logout: "LOGOUT",
      },
    },
  },
  lng: savedLang,
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
