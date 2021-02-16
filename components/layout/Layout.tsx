import Navbar from './Navbar';
import Footer from './Footer'

interface Props {
  children: JSX.Element[] | JSX.Element
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className="container">
      <Navbar />
        {children}
      <Footer />
    </div>
  )
}

export default Layout
