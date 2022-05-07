
import React from 'react';
import { useLocation} from "react-router-dom"

const Wind = () =>{
   const location = useLocation();

  return (
    <div className="main-margin Wind">
      <h1>Wind</h1>
    </div>
  );
}

export default Wind;

