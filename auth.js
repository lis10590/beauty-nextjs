import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./app/api/auth/lib/mongodbAdapter";
import connectDB from "./app/_utils/db";
import getUserModel from "./app/_utils/schemas/User";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  // adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   const Exteduser = user;
    //   if (Exteduser) token.role = Exteduser.role;

    //   return token;
    // },
    async session({ session, token }) {
      if (session?.user) {
        const User = await getUserModel();
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
        }
        session.user.role = token.role;
        // session.user.id = token.sub;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        // const user = await axios.post(`${apiUrl}/api/auth/login`, credentials);

        const User = await getUserModel();
        const user = await User.findOne({ email: credentials.email });
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          console.log(user);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
