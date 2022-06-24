import Link from 'next/link';
import { useAuth } from '../context/authContext';
import { useRouter } from 'next/router'
import http from '../http-common'

function Navbar(){
    const router = useRouter();
    const { initialState,setInitialState } = useAuth();
    const handleLogout = () => {
        http.post('logout').then(() => {
            localStorage.removeItem('token');
            setInitialState({
              ['isLogged']:false,['user']:null
            });
            router.push('/login');
        });
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link">About</Link>
              </li>
              
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {initialState.isLogged === true &&
              <li className="nav-item">
              <a className="nav-link" onClick={handleLogout}>Logout</a>
            </li>
            }
            {initialState.isLogged === false &&
            <li className="nav-item">
              <Link href="/login" className="nav-link">Login</Link>
            </li>
             }  
            </ul>
          </div>
        </div>
      </nav> 
    )
}

export default Navbar;