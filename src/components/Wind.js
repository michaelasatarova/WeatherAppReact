
import React from 'react';
import { useLocation} from "react-router-dom"

const Wind = () =>{
   const location = useLocation();
   const {state} = location;

console.log(state)

  return (
    <div className="main-margin Wind">
      <h1>Wind</h1>
      {/* {state.from.list.map((value, index ) => {
         return <div key={index}>{value.wind.deg}</div>;
      } )} */}
    </div>
  );
}

export default Wind;

