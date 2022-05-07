import React from 'react';
import { useLocation} from "react-router-dom"

const Precipitation = () =>{
   const location = useLocation();

  return (
    <div className="main-margin Precipitation">
      <h1>Precipitation</h1>
    </div>
  );
}

export default Precipitation;
