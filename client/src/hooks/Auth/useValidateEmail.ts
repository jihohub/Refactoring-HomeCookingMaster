import { useQuery } from "react-query";
import axios from "axios";

type Overlaps = {
  overlaps: boolean;
}

function validateEmail(): Promise<Overlaps> {
  return axios.get("/api/auth/signup/val_email").then((response) => response.data);
}

function useValidateEmail() {
  return useQuery<Overlaps, Error>("groups", validateEmail);
}
