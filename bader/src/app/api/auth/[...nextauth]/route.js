// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user.id = token.sub;
//       return session;
//     },
//   },
// });

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // أول مرة يدخل فيها بحسابه في Google، أنشئه في الداتا بيس
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          IsConfirmed: true,
        });
      } else {
        // تحقق إذا كان المستخدم مفعّل
        if (!existingUser.IsConfirmed) {
          return false; // لا تسمح بتسجيل الدخول إذا غير مفعّل
        }
      }

      return true;
    },

    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        session.user.id = user._id.toString();
        session.user.role = user.role;
        session.user.image = user.image || user.profilePicture || null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=OAuth",
  },
});

export { handler as GET, handler as POST };
