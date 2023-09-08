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
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MD5 from 'crypto-js/md5'

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPwd, setUserPwd] = useState('')
  const [submiting, setSubmitting] = useState(false)
  const router = useRouter()
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
  const onSubmit = async ()=>{
    setSubmitting(true)
    console.log(form.values.email,form.values.password)
    try {
      const secretPwd = MD5(form.values.password + "zx" + String(form.values.email.length) + "yoyo").toString()
      const response = await fetch('/api/user',{
        method: 'POST',
        body: JSON.stringify({
          username: form.values.email,
          password: secretPwd
        })
      })
      if(response.ok){
        console.log(await response.json())
        router.push('/todo')
      }else{
        console.log(await response.json())
      }
    } catch (error) {
      
    }finally{
      setSubmitting(false)
      
    }
  }
  return (
    <>
      <Meta title='登录' description='登录以验证身份信息，体验更多功能' />
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
                      onChange={(e)=> form.setFieldValue('email',e.currentTarget.value)} 
                      placeholder="you@email.com"
                      error={form.errors.email && "邮箱账号错误"}
                      radius={'md'} 
                      />
            <PasswordInput label="密码"
                          value={form.values.password}
                          radius={'md'}
                          onChange={(e)=> form.setFieldValue('password', e.currentTarget.value)}
                          error={form.errors.password && "密码格式错误"}  
                          placeholder="密码" required mt="md" />
            <Group position="apart" mt="lg">
              <Checkbox label="记住账号" />
              <Anchor component="a" size="sm" href='/forget'>
                忘记密码?
              </Anchor>
            </Group>
            <Button loading={submiting} fullWidth mt="xl" type='submit'>
              登 录
            </Button>
          </form>
          
        </Paper>
      </Container>
    </>
  );
}

export default Login