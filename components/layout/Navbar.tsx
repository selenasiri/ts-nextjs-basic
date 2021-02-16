import Link from 'next/link'
import styles from '../../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.main}>
      <Link href="/">
        <a>Home</a>
      </Link>

      <Link href="/users">
        <a>Users</a>
      </Link>

      <Link href="/todosSSR">
        <a>Todos</a>
      </Link>
    </div>
  )
}

export default Navbar