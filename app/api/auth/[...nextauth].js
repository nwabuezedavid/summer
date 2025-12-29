// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
  // your prisma singleton
import bcrypt from "bcrypt"; // optional if hashed passwords
import prisma from "@/action/db";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // or "database" for DB sessions
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameoremail: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.usernameoremail },
              { username: credentials.usernameoremail },
            ],
          },
        });

        if (!user) throw new Error("No user found");

        // if passwords are plain
        if (user.password !== credentials.password) throw new Error("Invalid password");

        // return user object if login succeeds
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", // optional: custom login page
  },
});
