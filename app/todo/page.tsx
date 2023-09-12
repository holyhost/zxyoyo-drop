"use client"
import { TextInput, ActionIcon, useMantineTheme, TextInputProps } from '@mantine/core'
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: '待办事项',
    description: 'TODO LIST',
}

const TodoList = () => {

    const theme = useMantineTheme();
  return (
    <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <IconArrowRight size="1.1rem" stroke={1.5} />
          ) : (
            <IconArrowLeft size="1.1rem" stroke={1.5} />
          )}
        </ActionIcon>
      }
      placeholder="Search questions"
      rightSectionWidth={42}
   
    />
  )
}

export default TodoList
