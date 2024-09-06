import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

  export const authOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri:process.env.GOOGLE_REDIRECT_URI,
        authorization: {
            params: {
              scope: "openid email profile",
              prompt: "select_account",
              ack_oob_shutdown: "2022-10-03",  // Acknowledge OOB shutdown
            },
          },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
  };


const handler = NextAuth(authOptions);

// Define the HTTP methods supported for the route
export { handler as GET, handler as POST };
