import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = req.body;
  try {
    const response = await axios
      .post("/api/auth/login", auth, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        withCredentials: true,
      })
      
    res.setHeader("Set-Cookie", `refresh_token=${response.data.data.refresh_token}`);
    res.status(200).json(response.data);
    // res.send(response.data);
      // .then((response) => response.setHeader("Set-Cookie", response.data.refresh_token))

    //  Update headers on requester using headers from Node.js server response
    // res.status(200).json(data);
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error);
  }
};
