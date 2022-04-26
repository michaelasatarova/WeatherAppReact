
import React from 'react';
import { useLocation} from "react-router-dom"

const Wind = () =>{
   const location = useLocation();
   const {from} = location.state;

console.log(from)

  return (
    <div className="Wind">
      <h1>Wind</h1>
      <div>{from}</div>
    </div>
  );
}

export default Wind;

