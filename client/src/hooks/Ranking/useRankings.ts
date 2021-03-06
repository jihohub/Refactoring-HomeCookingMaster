import { useQuery } from "react-query";
import axios from "axios";

type Ranking = {
  result: string;
  message: string;
  data: Array<{
    id: number;
    name: string;
    likes: number;
    views: number;
    img: string;
    servings: string;
    difficulty: string;
    cooking_time: string;
    food_id: number;
  }>;
};

async function fetchRankings(): Promise<Ranking> {
  return await axios.get("api/main/ranking").then(response => response.data);
}

export default function useRankings() {
  return useQuery<Ranking, Error>("rankings", fetchRankings);
}
