"use client"

import React from 'react'
import { createStyles, Header, Menu, Group, Center, Burger, Container, rem, Text, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconBrandApple } from '@tabler/icons-react';
import Link from 'next/link';
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
const links = [
    {
      "link": "/todo",
      "label": "Todo"
    },
    {
      "link": "#1",
      "label": "Learn",
      "links": [
        {
          "link": "/docs",
          "label": "Documentation"
        },
        {
          "link": "/resources",
          "label": "Resources"
        },
        {
          "link": "/community",
          "label": "Community"
        },
        {
          "link": "/blog",
          "label": "Blog"
        }
      ]
    },
    {
      "link": "/about",
      "label": "About"
    },
    {
      "link": "/pricing",
      "label": "Pricing"
    },
    {
      "link": "/login",
      "label": "登录",
      "links": [
        {
          "link": "/faq",
          "label": "FAQ"
        },
        {
          "link": "/demo",
          "label": "Book a demo"
        },
        {
          "link": "/login",
          "label": "登录"
        }
      ]
    }
  ]

const AppHeader = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
  
    const items = links.map((link) => {
      const menuItems = link.links?.map((item) => (
        <Menu.Item key={item.link}>{item.label}</Menu.Item>
      ));
  
      if (menuItems) {
        return (
          <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <a
                href={link.link}
                className={classes.link}
                onClick={(event) => console.log('click',link.link)}
              >
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                  <IconChevronDown size="0.9rem" stroke={1.5} />
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
          </Menu>
        );
      }
  
      return (
        <a
          key={link.label}
          href={link.link}
          className={classes.link}
        >
          {link.label}
        </a>
      );
    });
  
    return (
      <Header height={56} className={classes.header} mb={120}>
        <Container>
          <div className={classes.inner}>
            <IconBrandApple color="#fff" size={32} />
            <Anchor href='/' sx={{textDecoration: 'none'}}>
              <Text color="#fff" size="lg">只想优优</Text>
            </Anchor>
            
            <Group spacing={5} className={classes.links}>
              {items}
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