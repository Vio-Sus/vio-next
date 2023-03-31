import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from "next-auth/providers/azure-ad";

import bcrypt from "bcrypt";
import { prisma } from '../../../../server/db/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter";


export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),
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
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      idToken: true,
      profile(profile) {
        return {
          id: profile.oid,
          name: profile.name,
          email: profile.email,
        }
      },
    }),
    
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
  }
}
export default NextAuth(authOptions)