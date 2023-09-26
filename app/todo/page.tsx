import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: '待办事项',
    description: 'TODO LIST',
}

const TodoList = () => {

  return (
    <>
      <h1 className="text-3xl font-bold underline">this is todo list page</h1>
    </>
  )
}

export default TodoList
