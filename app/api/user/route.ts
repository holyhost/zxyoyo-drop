import { NextRequest, NextResponse } from 'next/server'
 
// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
// const secret = request.nextUrl.searchParams.get('secret')
// const tag = request.nextUrl.searchParams.get('tag')
// if (secret !== process.env.MY_SECRET_TOKEN) {
//   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
// }

// if (!tag) {
//   return NextResponse.json({ message: 'Missing tag param' }, { status: 400 })
// }

// revalidateTag(tag)
export const POST = async (request: NextRequest) => {
  const {username, password} = await request.json()
  const email = process.env.ADMIN_EMAIL
  const pwd = process.env.ADMIN_SECRET
  if(username === email && password === pwd){
    return NextResponse.json({ message: "登录成功", now: Date.now() })
  }else{
    return NextResponse.json({ message: '密码错误' }, { status: 401 })
  }
  
}
