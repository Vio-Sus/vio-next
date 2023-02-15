import {NextPage} from 'next';
import {useSession} from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


const Protected: NextPage = () => {
    const {data: session} = useSession();
    const {status} = useSession();
    const Router = useRouter();
    
    useEffect(()=>{
        if(status === "unauthenticated") {
            Router.push("/auth/SignIn")
        }
    },[status])

    if(status === "authenticated")
    {
        return (
            <div>
            <h1>Protected Page</h1>
            <p>
                {session?.user?.email
                ? `You are signed in with ${session.user.email}`
                : 'You are not signed in'}
            </p>
            </div>

        )
    }
    return <div>loading</div>
}

export default Protected;