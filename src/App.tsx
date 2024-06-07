import React, { useEffect, useState } from 'react';
import Routers from './Router';
import Alert from './components/customUI/alert'

const App:React.FC = (): JSX.Element => {
  const [isInitialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setInitialLoading(false); 
    }, 3000); 

    return () => clearTimeout(delay); 
  }, []);

  console.log(isInitialLoading,'from  app');
  
  return (
   <>
   <Alert/>
    
        <Routers/>
   </> 
    
  );
}

export default App;
