import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

const Temperature = () => {
  const location = useLocation();
  const { state } = location;
  
  const [dataTemperature, setDataTemperature] = useState();
  const test = []

  useEffect(() => {
      let newData = [];
       function getTemperature (arg){
          const loop = arg.map((value) => {
              return Math.round(value.main.feels_like - 273.15);
            })
            newData.push(loop);
          };



          console.log("state.fromTemperature.list",state.fromTemperature.list)
          getTemperature(state.fromTemperature.list)
          setDataTemperature(newData[0])
          console.log("newdata", newData[0].length)
          test.push(newData[0])
        },[])

          console.log("dataTemperature", dataTemperature)

          const [userData , setUserData] = useState({
            
            labels: [9, 12, 15, 18, 21 ],
            datasets: [{
              labels: ["data"],
              data: test, 
      
            }]
          });

  return (
    <div className="main-margin Temperature">
      <div>
         <div>{state.fromTemperature.city.name}</div> 
        <div>temperature</div>
      </div>
      <HiOutlineMenuAlt2 />

      {/* {dataTemperature} */}
      {/* BARCHARTS */}
        <Bar data={userData} /> 
      
      


      {/* {state.fromTemperature.list.map((value, index) => {
        return <div key={index}>{value.wind.deg}</div>;
      })} */}
    </div>
  );
};

export default Temperature;
