declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KINDE_CLIENT_ID: string;
      KINDE_CLIENT_SECRET: string;
      KINDE_ISSUER_URL: string;
      KINDE_SITE_URL: string;
      KINDE_POST_LOGOUT_REDIRECT_URL: string;
      KINDE_POST_LOGIN_REDIRECT_URL: string;

      KINDE_MANAGEMENT_CLIENT_ID: string;
      KINDE_MANAGEMENT_CLIENT_SECRET: string;

      KINDE_DEFAULT_ORG_NAME: string;
    }
  }
}

export {}