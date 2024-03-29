

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../../../../server/db/client'


export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  
  callbacks: {
    async session({ session, user }) {
      // console.log(session);
      // console.log(user);

      return session;
      
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log(token);
      return token;
    },
  },

  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "a@b.c" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string }
        const prismaUser = await prisma.user.findUnique({
          where: {
            email: email
          }
        })
        const isValid = await bcrypt.compare(password, prismaUser?.password || "")
        if (email !== prismaUser?.email) {
          console.log("wrong email")
          throw new Error("Invalid credentials")
        } else if (!isValid) {
          console.log("wrong password")
          throw new Error("Invalid credentials")
        }
        console.log(email, password)
        return { id: prismaUser.id, name:prismaUser.name, email: prismaUser.email }
      }
    }),
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET!
    }),
  ],

}
export default NextAuth(authOptions)
