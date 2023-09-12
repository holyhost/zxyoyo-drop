import React, { useState } from 'react'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Meta } from '@/components/Meta'
import { Center, Container, Group } from '@mantine/core'
import PoemList from '@/components/gushi/PoemList'

export const metadata: Metadata = {
    title: '只想优优',
    description: '记录了各种各种的技术文章',
}

export async function getServerSideProps(context: any) {
  const res = await fetch( process.env.APP_HOST + '/api/gsc')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      // throw new Error('Failed to fetch data')
      console.log("...error when fetch poem")
      return {
        props: {
          data: [],
        },
      };
    }
   const mydata = await res.json()
  return {
    props: {
      data: mydata.data.data,
    },
  };
}


const Home = ({data}: any) => {
  const  itemList =[]
  let index = 100;
  while(--index>0) itemList.push(index)
  return (
    <>
        <Meta title='只想优优' description='程序员的代码日常' />
        <Container>
            <PoemList data={data}/>
        </Container>
    </>
  )
}

export default Home