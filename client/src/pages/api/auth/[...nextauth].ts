import type { User, NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiHandler } from "next";

type GenericObject<T = unknown> = T & {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

interface AuthToken {
  user: User;
  accessToken: string;
  accessTokenExpires?: number;
  expires_in?: number;
  refreshToken: string;
  id_token: string;
  error?: string;
}

interface JwtInterface {
  token: AuthToken;
  user: User;
  account: GenericObject;
}

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
const refreshAccessToken = async (
  payload: AuthToken,
  clientId: string,
  clientSecret: string
): Promise<AuthToken> => {
  try {
    const url = new URL("https://accounts.google.com/o/oauth2/token");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("client_secret", clientSecret);
    url.searchParams.set("grant_type", "refresh_token");
    url.searchParams.set("refresh_token", payload.refreshToken);

    const response = await fetch(url.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshToken = await response.json();

    if (!response.ok) {
      throw refreshToken;
    }

    // Give a 10 sec buffer
    const now = new Date();
    const accessTokenExpires = now.setSeconds(
      now.getSeconds() + parseInt(refreshToken.expires_in) - 10
    );

    return {
      ...payload,
      accessToken: refreshToken.access_token,
      accessTokenExpires,
      refreshToken: payload.refreshToken,
    };
  } catch (error) {
    console.error("ERR", error);

    return {
      ...payload,
      error: "RefreshAccessTokenError",
    };
  }
};

const AuthHandler: NextApiHandler = (req, res) => {
  const JWT_SECRET = process.env.SECRET;
  const options: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "email",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: {
            label: "이메일",
            type: "text",
            placeholder: "abc@mail.com",
          },
          password: { label: "비밀번호", type: "password" },
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const res = await fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
          // Return null if user data could not be retrieved
          return null;
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: GOOGLE_AUTHORIZATION_URL,
      }),
    ],
    secret: JWT_SECRET,
    jwt: {
      // encryption: true,
      secret: JWT_SECRET,
    },
    debug: process.env.NODE_ENV === "development",
    callbacks: {
      // @ts-ignore
      async jwt({ token, user, account }: JwtInterface): Promise<AuthToken> {
        let res: AuthToken;

        const now = Date.now();
        
        // Signing in
        if (account && user) {
          const accessToken = account.access_token;
          const refreshToken = account.refresh_token;

          res = {
            accessToken,
            accessTokenExpires: account.expires_at,
            id_token: account.id_token,
            refreshToken,
            user,
          };
        } else if (
          token.accessTokenExpires === null ||
          now < token.accessTokenExpires
        ) {
          // Subsequent use of JWT, the user has been logged in before
          // access token has not expired yet
          res = token;
        } else {
          // access token has expired, try to update it
          res = await refreshAccessToken(
            token,
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
          );
        }

        return res;
      },
      // @ts-ignore
      async session({
        token,
      }: {
        token: GenericObject;
      }): Promise<GenericObject> {
        return Promise.resolve(token);
      },
    },
  };

  return NextAuth(req, res, options);
};

export default AuthHandler;