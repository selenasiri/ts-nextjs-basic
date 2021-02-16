// pages/todosSSR.tsx     -- http://localhost:3000/todosSSR

import React from 'react'
import Head from 'next/head'
import axios from 'axios'
import { GetServerSideProps } from 'next'

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  todos: Todo[]
}

const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <div>
      <Head>
        <title>NextJS Basic | Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Hello from {todos?.length} Todos</h1>

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}


// export type GetStaticPropsResult<P> =
//   | { props: P; revalidate?: number | boolean }
//   | { redirect: Redirect; revalidate?: number | boolean }
//   | { notFound: true }

export const getServerSideProps: GetServerSideProps = async context => {
  const response = await axios.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`)

  if (!response.data) {
    return { notFound: true }  // 404 page - This page could not be found.
  }

  // if (!response.data) {
  //   return {
  //     redirect: {
  //       destination: '/',    // redirect to home page
  //       permanent: false,
  //     }
  //   }
  // }
  
  return  {
    props: { todos: response.data }
  }
}

export default Todos

// https://nextjs.org/learn/excel/typescript/nextjs-types

// The old ways:

// method 1: use native fetch 
/*
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/todos')
       .then(response => response.json())
       .then(json => setTodos(json))
  }, [])
*/

// method 2: use axios
/*
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
	  const fetchData = async () => {
	    const {data} = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
		  setTodos(data)
	  }
	  
	  fetchData()
	}, []) 
*/