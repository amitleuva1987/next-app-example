import { useEffect, useState } from "react";
import http from '../http-common'
import { useRouter } from 'next/router'
import { useAuth } from '../context/authContext';

function Login() {
    const router = useRouter();
    const { initialState, setInitialState } = useAuth();
    const [fields, setFields] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (initialState.isLogged) {
            router.push('/');
        }
    }, [initialState.isLogged]);

    const handleInputChange = (event) => {
        setFields({
            ...fields,
            [event.target.name]: event.target.value
        });
    }

    const handleLogin = (event) => {
        http.post('login', { email: fields.email, password: fields.password }).then(response => {
            localStorage.setItem('token', response.data.token);
            setInitialState({
                ['isLogged']: true, ['user']: response.data.user
            })
            router.push('/');
        })
        event.preventDefault();
    }
    return (
        <div className="container my-5">
            <div className="row justify-content-md-center">
                <form className="col-sm-5 border border-primary p-5">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" onChange={handleInputChange} />
                    </div>
                    <button className="btn btn-primary w-100 mt-3" onClick={handleLogin}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;