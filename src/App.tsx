import React, { useEffect, useState } from 'react';
import Authentication from './pages/userPages/signinSignupPage';
import Routers from './Router';
import MainLoader from './components/customUI/mainLoader';
import Alert from './components/customUI/alert'
function App(): JSX.Element {
  const [isInitialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading delay
    const delay = setTimeout(() => {
      setInitialLoading(false); // Set initial loading state to false after delay
    }, 3000); // Adjust delay time as needed

    return () => clearTimeout(delay); // Cleanup timeout on component unmount
  }, []);

  console.log(isInitialLoading,'from  app');
  
  return (
    <>
    <Alert/>
        <Routers />
     
    </>
  );
}

export default App;
