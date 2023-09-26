"use client"
import React, { useEffect, useState } from 'react'
import { createStyles, Header, Menu, Group, Center, Burger, Container, rem, Text, Anchor, Button } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconChevronDown, IconBrandApple } from '@tabler/icons-react';
import Link from 'next/link';
import useCurrentUser, { UserState } from '@/hooks/store/user.store';
import { useSession, signIn, signOut } from "next-auth/react"
import UserAvatar from '../UserAvatar';
import { useRouter } from 'next/navigation';
// import { MantineLogo } from '@mantine/ds';


const useStyles = createStyles((theme) => ({
    header: {
      backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
      borderBottom: 0,
    },
  
    inner: {
      height: rem(56),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: `${rem(8)} ${rem(12)}`,
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.white,
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        ),
      },
    },
  
    linkLabel: {
      marginRight: rem(5),
    },
  }));

const AppHeader = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { data: session } = useSession()
    const { classes } = useStyles()
    const router = useRouter()
    const userStore = useCurrentUser()
    const [userInfo, setUserInfo] = useState<UserState>({
      uid: '123',
      token: '',
      validation: 30,
    })
    const [cachedUser, setCachedUser] = useLocalStorage({key: 'user', defaultValue: ''})

    const onLogout = ()=>{
      setCachedUser('')
      // setUserInfo(undefined)
      router.replace('/')
    }
    useEffect(()=>{
      if(!userInfo && cachedUser){
        try {
          setUserInfo(JSON.parse(cachedUser))
          userInfo && userStore.update(userInfo)
        } catch (error) {
          console.log(error)
        }
      }else{
        console.log(userInfo)
      }
    })
    


    return (
      <Header height={56} className={classes.header} mb={120}>
        <Container>
          <div className={classes.inner}>
            <IconBrandApple color="#fff" size={32} />
            <Anchor href='/' sx={{textDecoration: 'none'}}>
              <Text color="#fff" size="lg">只想优优</Text>
            </Anchor>
            
            <Group spacing={5} className={classes.links}>
              <a
                key={'head-link-todo'}
                href={'/todo'}
                className={classes.link}
              >
                Todo
              </a>
              <a
                key={'head-link-about'}
                href={'/about'}
                className={classes.link}
              >
                About
              </a>
              {session?.user ? <UserAvatar user={{username: session.user.name || '', image: session.user.image || ''}} logout= {signOut}/> :<Button
                key={'head-link-login'}
                onClick={()=> signIn()}
                className={classes.link}
              >
                登录
              </Button>}
            </Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
              color="#fff"
            />
          </div>
        </Container>
      </Header>
    );
}

export default AppHeader