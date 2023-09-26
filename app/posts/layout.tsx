import React, { ReactElement } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '文章',
    description: '记录了各种各种的技术文章',
}

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <>
    <html>
      <body>
        <div>Layout</div>
        <div>{children}</div>
      </body>
    </html>
      
    </>

  )
}

export default Layout