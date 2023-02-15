import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {prisma} from "../../../../server/db/client"


export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  secret: process.env.AUTH_SECRET,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days-
  },
  providers: [
   CredentialsProvider({
    // The name to display on the sign in form (e.g. "Sign in with...")
    name: "Credentials",
    // `credentials` is used to generate a form on the sign in page.
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      email: { label: "Email", type: "text", placeholder: "murad@gmail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
        // const {username, password} = credentials as {username: string, password: string}

        console.log("credentials", credentials)
        
const user = await prisma.user.findUnique({
  where: {
    email: credentials?.email,
  },
})

        

        if (user) {
            // Any user object returned here will be saved in the JSON Web Token
            return user
        }
        
        console.log("USERRRR", user)
        return null
      }


  })
  ],
  pages: {
    signIn: "../../SignIn"
  }

}


export default NextAuth(authOptions)