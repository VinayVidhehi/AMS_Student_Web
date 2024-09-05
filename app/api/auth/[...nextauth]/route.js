import NextAuth from "next-auth";
import { authOptions } from "@/app/utilities/authOptions";


const handler = NextAuth(authOptions);

// Define the HTTP methods supported for the route
export { handler as GET, handler as POST };
