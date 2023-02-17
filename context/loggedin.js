import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthUserContext';

// import Dashboard from './dashboard'

const LoggedIn = ({ children }) => {
  const { authUser, loading} = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    
    if (!loading && !authUser)
      router.push('/')
  }, [authUser, loading])

  return (
    //Your logged in page
    <>
      {children}
    </>
  )
}

export default LoggedIn;