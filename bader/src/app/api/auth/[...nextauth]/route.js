
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";  // Import CredentialsProvider
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Adding CredentialsProvider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });
        if (user && user.password === credentials.password) {
          return user;  // Return user if credentials are correct
        } else {
          return null;  // Return null if credentials are incorrect
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.image = token.image || session.user.image;  // Ensure user image is attached
      }
      return session;
    },
  },

  pages: {
    signIn: "/",  // 
    error: "/login?error=OAuth",  // Error page in case of OAuth error
  },
});

export { handler as GET, handler as POST };
