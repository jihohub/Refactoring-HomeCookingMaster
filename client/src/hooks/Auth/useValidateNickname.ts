import { useQuery } from "react-query";
import axios from "axios";

type Overlaps = {
  overlaps: boolean;
}

function validateNickname(): Promise<Overlaps> {
  return axios.get("/api/auth/signup/val_nickname").then((response) => response.data);
}

function useValidateNickname() {
  return useQuery<Overlaps, Error>("groups", validateNickname);
}
