import { useAuth } from "../context/authContext";

function ProtectedRoutes({router,children})
{
    const { initialState } = useAuth();
    const protectroutes = [
        '/',
    //  '/about'
    ];

    const protect_value = protectroutes.indexOf(router.pathname) !== -1
    if(initialState.isLogged === false && protect_value && typeof window !== 'undefined')
    {
        router.push('/login')
    }
    else
    {
        return children;
    }
}

export default ProtectedRoutes;