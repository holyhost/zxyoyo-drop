"use client"
import { Meta } from '@/components/Meta';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Alert,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import MD5 from 'crypto-js/md5'
import { AppLayout } from '@/components/layout/AppLayout';
import { IconAlertCircle } from '@tabler/icons-react';
import useCurrentUser from '@/hooks/store/user.store';
import { useLocalStorage } from '@mantine/hooks';
import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {
  const { data: session } = useSession()
  const [userName, setUserName] = useState('')
  const [userPwd, setUserPwd] = useState('')
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useLocalStorage({key: 'user', defaultValue: ''})
  const user= useCurrentUser()
  console.log(user)
  const [inited, setInited] = useState<boolean>(false)
  const [submiting, setSubmitting] = useState(false)
  const router = useRouter()
  useEffect(() => setInited(true), [])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : '邮箱账号格式不匹配'),
      password: (val) => (val.length < 8 ? '密码至少8位' : null),
    },
  });
  const onSubmit = async () => {
    setSubmitting(true)
    console.log(form.values.email, form.values.password)
    try {
      const secretPwd = MD5(form.values.password + "zx" + String(form.values.email.length) + "yoyo").toString()
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          username: form.values.email,
          password: secretPwd
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        user.update(data)
        setUserInfo(JSON.stringify(data))
        router.push('/')
      } else {
        const data = await response.json()
        setError(data.message)
        console.log(data)
      }
    } catch (error) {

    } finally {
      setSubmitting(false)

    }
  }
  const onFormChanged = (fieldName: string, value:string)=>{
    form.setFieldValue(fieldName, value)
    if(error) setError('')
  }
  return (
    <>
      <Meta title='登录' description='登录以验证身份信息，体验更多功能' />
      {!inited ? '' :
          <Container size={420} my={40}>
            <Title
              align="center"
              sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
              欢 迎 回 来 !
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              还没有账号?{' '}
              <Anchor size="sm" component="button">
                创建账号
              </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <form onSubmit={form.onSubmit(() => onSubmit())}>
                <TextInput label="邮箱"
                  required
                  value={form.values.email}
                  onChange={(e) => onFormChanged('email', e.currentTarget.value)}
                  placeholder="you@email.com"
                  error={form.errors.email && "邮箱账号错误"}
                  radius={'md'}
                />
                <PasswordInput label="密码"
                  value={form.values.password}
                  radius={'md'}
                  onChange={(e) => onFormChanged('password', e.currentTarget.value)}
                  error={form.errors.password && "密码格式错误"}
                  placeholder="密码" required mt="md" />
                <Group position="apart" mt="lg">
                  <Checkbox label="记住账号" />
                  <Anchor component="a" size="sm" href='/forget'>
                    忘记密码?
                  </Anchor>
                </Group>
                <Button loading={submiting || error.length>0} fullWidth mt="xl" type='submit'>
                  登 录
                </Button>
                {!error || <Alert icon={<IconAlertCircle size="1rem" />} 
                                 title="" color="red">
                  登录失败！
                  {error}
                </Alert>}
              </form>
              <button onClick={() => signOut()}>Sign out</button>
              <button onClick={() => signIn()}>Sign in</button>
            </Paper>
          </Container>
      }
    </>
  );
}

export default Login