import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    secret: process.env.SECRET,
    providers: [
      // OAuth authentication providers
      GoogleProvider({
        clientId: `${process.env.GOOGLE_ID}`,
        clientSecret: `${process.env.GOOGLE_SECRET}`,
      }),
    ],
  })
}

