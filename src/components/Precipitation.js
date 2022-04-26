import React from 'react';
import { useLocation} from "react-router-dom"

 const Precipitation = () => {
  const location = useLocation();
  const {state} = location;

console.log(state)

  return (
    <div className=" main-margin Precipitation">
      <h1>Precipitation</h1>
      {/* {state.fromTest.list.map((value, index ) => {
         return <div key={index}>{value.wind.deg}</div>;
      } )} */}
    </div>
  );
}

export default  Precipitation;
