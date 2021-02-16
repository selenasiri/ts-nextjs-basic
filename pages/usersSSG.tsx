// pages/usersSSG.tsx     -- http://localhost:3000/usersSSG
// https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { GetStaticProps } from 'next'

export interface User {
  id: number;
  name: string;
  username: string;
}

interface Props {
  users: User[]
}

const Users : React.FC<Props> = ({users}) => {
  if (!users) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>NextJS Basic | Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Hello from Users - # of users: {users?.length}</h1>

      <ul>
        {users && users.map(user => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>
              {user.name}
            </Link>
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

// (Static Generation): Fetch data at build time
export const getStaticProps: GetStaticProps = async context => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
  
  // if (!response.data) { // 404 page
  //   return {
  //     notFound: true,
  //   }
  // }

  if (!response.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  // By returning { props: users }, the Users component
  // will receive `users` as a prop at build time
  return {
    props: { // A required object with the props that will be received by the page component.
      users: response.data 
    },
    // Re-generate the post at most once per 10 second
    // if a request comes in
    revalidate: 10  // An optional amount in seconds after which a page re-generation can occur in production.
  }
}

export default Users



