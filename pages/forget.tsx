import { Meta } from '@/components/Meta';
import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
  import { useRouter } from 'next/router'
  
  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: rem(26),
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));
  
  const ForgotPassword = () => {
    const { classes } = useStyles();
    const router = useRouter()
    return (
      <Container size={460} my={30}>
        <Meta title='忘记密码' description='通过邮箱重置密码' />
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="me@email.com" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline onClick={()=>router.back()}>
                <IconArrowLeft size={rem(12)} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    );
  }

  export default ForgotPassword
  