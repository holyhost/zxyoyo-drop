"use client"
import { AppLayout } from '@/components/AppLayout'
import { Center, Loader } from '@mantine/core'
import React, { ReactElement, useEffect, useState } from 'react'

const defaultLayout = <AppLayout><div>this is home page </div></AppLayout>
const loading = <Center p="xl"><Loader size="xl" /></Center>
const Home = () => {
    const [inited, setInited] = useState<boolean>(false)
    useEffect(()=> setInited(true),[])
  return (
  <>
    {inited ? defaultLayout : loading}
  </>)
}

export default Home
