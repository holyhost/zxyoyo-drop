import User from "@/models/user"
import { connectToDB } from "@/utils/database"
import { randomBytes, randomUUID } from "crypto"
import { MD5 } from "crypto-js"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '123123',
            clientSecret: 'qweqwe'
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "input your account" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns eith a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const email = process.env.ADMIN_EMAIL
                const pwd = process.env.ADMIN_PWD
                const secret = process.env.NEXTAUTH_SECRET ?? 'zxyoyo'
                if(credentials?.username === email && credentials?.password === pwd){
                    return {
                        id: MD5(credentials?.username + secret + credentials?.password).toString(),
                        name: credentials?.username,
                        password: credentials?.password,
                        image: '/admin.png',
                        token: 'this is a token ,aaaaa',
                        role: 'admin'
                    }
                }
                
                // const res = await fetch("/your/endpoint", {
                //     method: 'POST',
                //     body: JSON.stringify(credentials),
                //     headers: { "Content-Type": "application/json" }
                // })
                // const user = await res.json()

                // If no error and we have user data, return it
                // if (res.ok && user) {
                //     return user
                // }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],

    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     try {
        //         await connectToDB()
        //         const userExists = await User.findOne({ email: user.name })
        //         if (!userExists) {
        //             console.log('user not exist')
        //             await User.create({
        //                 email: email,
        //                 username: email,
        //                 passward: email
        //             })
        //             console.log("create user....")
        //         }
        //         return true
        //     } catch (error) {
        //         console.log(error)
        //         return false
        //     }
        // },
        // async session({session}){
        //     console.log('will log session')
        //     console.log(session)
        //     const sessionUser = await User.findOne({email:session?.user?.email})
        //     if(session && session.user){
        //         console.log('session',sessionUser)
        //         session.user.name = sessionUser._id.toString()
        //     }
                
        //     return session
        // },

        async jwt({token, account, user}) {
            console.log('account', account)
            console.log('account', user)
            if(account){
                console.log('token', token)
                token.user = user
                token.role = "admin"
            }
            return token
          },
    }

})

export { handler as GET, handler as POST }