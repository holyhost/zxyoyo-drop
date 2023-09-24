import { getServerSession } from "next-auth"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('req')
    console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // console.log(123,req)
        console.log(123,token)
        // const session = getServerSession()
        // console.log(31,session)
        return token?.role === "admin"
      },
    },
  }
)

export const config = { matcher: ["/admin", "/todo"] }