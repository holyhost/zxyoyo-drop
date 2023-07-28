import { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorScheme, Container, MantineProvider } from '@mantine/core';
import { NextPage } from 'next';
import React, {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'inspector';
import { Router } from 'next/router';
import { AppLayout } from '@/components/AppLayout';

type CustomNextPage = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type CustomAppProps = {
  Component: CustomNextPage;
} & AppProps<{
  session: Session | null;
  colorScheme: ColorScheme;
  isMaintenanceMode: boolean | undefined;
}>;

export default function App(props: CustomAppProps) {
  const {
    Component,
    pageProps: {
      session,
      colorScheme: initialColorScheme,
      isMaintenanceMode,
      ...pageProps
    },
  } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme | undefined>(initialColorScheme);

  useEffect(() => {
    if (colorScheme === undefined && typeof window !== 'undefined') {
      const osColor = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      setColorScheme(osColor);
    }
  }, [colorScheme]);
  const getLayout = useMemo(
    () => Component.getLayout ?? ((page: React.ReactElement) => <AppLayout>{page}</AppLayout>),
    [Component.getLayout]
  );


  return (
    <>
      <Head>
        <title>只想优优</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Container>
          {getLayout(<Component {...pageProps} />)}
        </Container>
        
      </MantineProvider>
    </>
  );
}