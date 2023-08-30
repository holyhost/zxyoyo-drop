
const handler = async (req: any)=> {
  if (req.method === 'POST') {
    // Process a POST request
    console.log(await req.json())
    return new Response(JSON.stringify({message: "something got wrong"}),{status: 200})
    // console.log(res)
    // res.status(200).json({message: "hello world"})
  } else {
    // Handle any other HTTP method
    return new Response("something error",{status: 200})
  }
}

export {handler as GET, handler as POST}