import Header from './Header'
import SignInHeader from './SignInHeader'
import SignInFooter from './SignInFooter'
import Footer from './Footer'

const components = {
  Header,
  SignIn: {
    Header: SignInHeader,
    Footer: SignInFooter,
  },
  Footer,
}

export default components
