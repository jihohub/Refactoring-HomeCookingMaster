import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    debug: true,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,

        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      KakaoProvider({
        clientId: process.env.KAKAO_ID,
        clientSecret: process.env.KAKAO_SECRET,
      }),
    ],
    // pages: {
    //   signIn: "/signin",
    //   signOut: "/signout",
    // },
    secret: process.env.SECRET,
    // callbacks: {
    //   // session(session, token) {
    //   //   return session; // The type here should match the one returned in `useSession()`
    //   // },
    //   async session({ session, token, user }) {
    //     return session;
    //   },
    // },
  });
}

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   secret: process.env.SECRET,
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.id = token.id;
//       }
//       return session;
//     },
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       return true;
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl;
//     },
//     async session({ session, user, token }) {
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       return token;
//     },
//   },
//   pages: {
//     signIn: "/uuauth/signin",
//     signOut: "/uuauth/signout",
//     error: "/uuauth/error", // Error code passed in query string as ?error=
//     verifyRequest: "/uuauth/verify-request", // (used for check email message)
//     newUser: "/uuauth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
//   },
// });

//   session: {
//     // Use JSON Web Tokens for session instead of database sessions.
//     // This option can be used with or without a database for users/accounts.
//     // Note: `strategy` should be set to 'jwt' if no database is used.
//     strategy: "jwt",

//     // Seconds - How long until an idle session expires and is no longer valid.
//     maxAge: 30 * 24 * 60 * 60, // 30 days

//     // Seconds - Throttle how frequently to write to database to extend a session.
//     // Use it to limit write operations. Set to 0 to always update the database.
//     // Note: This option is ignored if using JSON Web Tokens
//     updateAge: 24 * 60 * 60, // 24 hours
//   },

//   // // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
//   // // option is set - or by default if no database is specified.
//   // // https://next-auth.js.org/configuration/options#jwt
//   jwt: {
//     // A secret to use for key generation (you should set this explicitly)
//     secret: process.env.SECRET,
//     // Set to true to use encryption (default: false)
//     // encryption: true,
//     // You can define your own encode/decode functions for signing and encryption
//     // if you want to override the default behaviour.
//     // encode: async ({ secret, token, maxAge }) => {},
//     // decode: async ({ secret, token, maxAge }) => {},
//   },

//   // You can define custom pages to override the built-in ones. These will be regular Next.js pages
//   // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
//   // The routes shown here are the default URLs that will be used when a custom
//   // pages is not specified for that route.
//   // https://next-auth.js.org/configuration/pages
//   pages: {
//     // signIn: '/auth/signin',  // Displays signin buttons
//     // signOut: '/auth/signout', // Displays form with sign out button
//     // error: '/auth/error', // Error code passed in query string as ?error=
//     // verifyRequest: '/auth/verify-request', // Used for check email page
//     // newUser: null // If set, new users will be directed here on first sign in
//   },

//   // Callbacks are asynchronous functions you can use to control what happens
//   // when an action is performed.
//   // https://next-auth.js.org/configuration/callbacks
//   callbacks: {
//     // async signIn({ user, account, profile, email, credentials }) { return true },
//     // async redirect({ url, baseUrl }) { return baseUrl },
//     // async session({ session, token, user }) { return session },
//     // async jwt({ token, user, account, profile, isNewUser }) { return token }
//   },

//   // Events are useful for logging
//   // https://next-auth.js.org/configuration/events
//   events: {},

//   // Enable debug messages in the console if you are having problems
//   debug: false,
// });