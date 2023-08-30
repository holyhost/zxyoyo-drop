import { Meta } from '@/components/Meta';
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

const Login = () => {
  const [userName, setUserName] = useState('')
  const [userPwd, setUserPwd] = useState('')
  const [submiting, setSubmitting] = useState(false)
  const router = useRouter()
  const onSubmit = async ()=>{
    setSubmitting(true)
    console.log(userName,userPwd)
    try {
      const response = await fetch('/api/user',{
        method: 'POST',
        body: JSON.stringify({
          username: userName,
          password: userPwd
        })
      })
      if(response.ok){
        console.log(await response.json())
        router.push('/')
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
          <TextInput label="邮箱"
                    value={userName}
                    onChange={(e)=> setUserName(e.target.value)} 
                    placeholder="you@email.com" 
                    required />
          <PasswordInput label="密码"
                        value={userPwd}
                        onChange={(e)=> setUserPwd(e.target.value)}  
                        placeholder="密码" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="记住账号" />
            <Anchor component="a" size="sm" href='/forget'>
              忘记密码?
            </Anchor>
          </Group>
          <Button loading={submiting} fullWidth mt="xl" onClick={onSubmit}>
            登 录
          </Button>
        </Paper>
      </Container>
    </>
  );
}

export default Login