import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout'
import {useEffect} from 'react'
import { AuthProvider } from '../context/authContext'
import ProtectedRoutes from '../components/ProtectedRoutes'

function MyApp({ Component, pageProps, router }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.bundle.min");
  },[])

  return( 
  <AuthProvider> 
    <Layout>
      <ProtectedRoutes router={router}>
        <Component {...pageProps} />
      </ProtectedRoutes>
    </Layout>   
  </AuthProvider> 
  )
}

export default MyApp