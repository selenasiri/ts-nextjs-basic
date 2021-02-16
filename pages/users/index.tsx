// pages/users.tsx     -- http://localhost:3000/users

import Head from 'next/head'
import axios from 'axios'
import { GetStaticProps } from 'next'
import Link from 'next/link'

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
      
      <h1>Hello from {users?.length} Users</h1>

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

// (Static Generation): Fetch data at build time
export const getStaticProps: GetStaticProps = async context => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
  
  // if (!response.data) { // 404 page
  //   return {
  //     notFound: true,
  //   }
  // }

  // if (!response.data) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     }
  //   }
  // }

  // By returning { props: users }, the Users component
  // will receive `users` as a prop at build time
  return {
    props: { // A required object with the props that will be received by the page component.
      users: response.data 
    },
    revalidate: 10  // An optional amount in seconds after which a page re-generation can occur in production.
  }
}

export default Users
