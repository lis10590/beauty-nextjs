import { handlers } from "@/auth";
export const { GET, POST } = handlers;

// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import axios from "axios";

// const authOptions = NextAuth({
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       authorize: async (credentials) => {
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//         const user = await axios.post(`${apiUrl}/api/auth/login`, credentials);

//         if (user) {
//           console.log(user.data);
//           return user.data;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { authOptions as POST, authOptions as GET };
