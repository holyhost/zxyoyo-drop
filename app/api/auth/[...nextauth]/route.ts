import User from "@/models/user"
import { connectToDB } from "@/utils/database"
import { randomBytes, randomUUID } from "crypto"
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '123123',
            clientSecret: 'qweqwe'
        })
    ],
    // const sessionUser = await User.findOne({email: session.user.email})
    // session.user.id = sessionUser._id.toString()
    // return session
    // async session({session}:{session:{
    //     strategy: string,
    //     maxAge: number,
    //     generateSessionToken: any
    // }}){
    //     return {
    //         strategy: "database",
    //         maxAge: 20*24*60 * 60,
    //         generateSessionToken: ()=> randomUUID?.() ?? randomBytes(32).toString('hex')
    //     }
    // },
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            console.log(user)
            console.log(account)
            console.log(profile)
            console.log(email)
            console.log(credentials)
            try {
                await connectToDB()
                const userExists = await User.findOne({email: email})
                if(!userExists){
                    await User.create({
                        email: email,
                        username: email,
                        passward: email
                    })
                    console.log("create user....")
                }
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
    }
    
})

export {handler as GET, handler as POST}