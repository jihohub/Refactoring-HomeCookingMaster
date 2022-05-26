import { useQuery } from "react-query";
import axios from "axios";

type Nickname = {
  nickname: string;
}

function signup(): Promise<Nickname> {
  return axios.post("/api/auth/signup").then((response) => response.data);
}

function useSignup() {
  return useQuery<Nickname, Error>("signup", signup);
}
