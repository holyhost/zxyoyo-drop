"use client"
import { PoemBean } from '@/bean/PoemBean'
import PoemList from '@/components/gushi/PoemList'
import MantineLayout from '@/components/layout/MantineLayout'
// import { AppLayout } from '@/components/AppLayout'
import { Center, Container, Loader } from '@mantine/core'
import React, { ReactElement, useEffect, useState } from 'react'

// const defaultLayout = <AppLayout><div>this is home page </div></AppLayout>
const loading = <Center p="xl"><Loader size="xl" /></Center>

const Home = () => {
  const [inited, setInited] = useState<boolean>(false)
  const [data, setData] = useState<PoemBean[]>([])
  useEffect(() => setInited(true), [])
  useEffect(() => {
    fetch('/api/gsc')
      .then(res => res.json())
      .then(res => setData(res.data.data))
  }, [])
  return (
    <>
      {inited ? <Container>
        {/* <PoemList data={data} /> */}
        <MantineLayout>
          <PoemList data={data} />
        </MantineLayout>
      </Container> : loading}
    </>)
}

export default Home
