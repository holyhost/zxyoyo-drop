import React, { useState } from 'react'
import type { Metadata } from 'next'
import Head from 'next/head'
import { Meta } from '@/components/Meta'
import { Center, Container, Group } from '@mantine/core'

export const metadata: Metadata = {
    title: '只想优优',
    description: '记录了各种各种的技术文章',
}



const Home = () => {
  const  itemList =[]
  let index = 100;
  while(--index>0) itemList.push(index)
  return (
    <>
        <Meta title='只想优优' description='程序员的代码日常' />
        <Container>
            {itemList.map(item => <Group key={item}>{'index=' +item}</Group>)}
        </Container>
    </>
  )
}

export default Home