import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthUserContext';

// import Dashboard from './dashboard'

const LoggedIn = ({ children }) => {
  const { authUser, loading} = useAuth();
  const router = useRouter();
  // console.log(loading + "," + authUser)
  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    console.log("enter logged 2")
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