import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../../../../server/db/client'

export const authOptions: NextAuthOptions = {

  session: {
    strategy: "jwt"
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
        if(email !== prismaUser?.email ) {
          console.log("wrong email")
          throw new Error("Invalid credentials")
        } else if (!isValid) {
          console.log("wrong password")
          throw new Error("Invalid credentials")
        }

     

        // if (email !== prismaUser?.email || !isValid) {
        //   console.log("Invalid credentials")
        //   throw new Error("Invalid credentials")
        // }

       
        console.log(email, password)
        return { id: prismaUser.id, firstnName: prismaUser.first_name,lastName: prismaUser.last_name, email: prismaUser.email }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  }
}
export default NextAuth(authOptions)