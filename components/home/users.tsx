import Head from 'next/head'
import useSWR from 'swr'
import axios from 'axios'

export interface User {
  id: number;
  name: string;
  username: string;
}

const fetcher = async (url: string) => {
  const {data} = await axios.get<User[]>(url)
  return data
}

// https://swr.vercel.app/
const Users = () => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)
  console.log(data)
  
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <Head>
        <title>NextJS Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1>Hello from Users - # of users: {data?.length}</h1>

      <ul>
        {data && data.map(user => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default Users




