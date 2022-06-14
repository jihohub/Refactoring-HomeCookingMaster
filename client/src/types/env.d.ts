declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
  }
}
