import { useQuery } from "react-query";
import axios from "axios";

type LoggedIn = {
  result: string;
  message: string;
  access_token: string;
  refresh_token: string;
};

function login(): Promise<LoggedIn> {
  return axios.get("/api/auth/login").then((response) => response.data);
}

function useLogin() {
  return useQuery<LoggedIn, Error>("groups", login);
}
