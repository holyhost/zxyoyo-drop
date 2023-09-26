import { AppShell, Text,
          useMantineTheme, Center, Button, 
          Stack, ThemeIcon, Title } 
          from '@mantine/core';
import { IconBan } from '@tabler/icons-react';
import { AppFooter } from './AppFooter';
import AppHeader from './AppHeader';
import { signOut } from 'next-auth/react';

export function AppLayout({ children, navbar }: Props) {

    const theme = useMantineTheme();
    // const user = useCurrentUser();
    const isBanned = false;
    // const flags = useFeatureFlags();
    return (
        <AppShell
            padding="md"
            className={`theme-${theme.colorScheme}`}
            header={<AppHeader/>}
            footer={<AppFooter/>}
            navbar={navbar}
            styles={{
                body: {
                  display: 'block',
                  maxWidth: '100vw',
                },
                main: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  paddingBottom: 61,
                  maxWidth: '100%',
                },
            }}
        >
                    {!isBanned ? (
          <>
            {children}
            {/* {flags.imageGeneration && <FloatingGenerationButton />} */}
          </>
        ) : (
          <Center py="xl">
            <Stack align="center">
              <ThemeIcon size={128} radius={100} color="red">
                <IconBan size={80} />
              </ThemeIcon>
              <Title order={1} align="center">
                You have been banned
              </Title>
              <Text size="lg" align="center">
                This account has been banned and cannot access the site
              </Text>
              <Button onClick={() => signOut()}>Sign out</Button>
            </Stack>
          </Center>
        )}
        </AppShell>
    );
}


type Props = {
    children: React.ReactNode;
    navbar?: React.ReactElement;
};