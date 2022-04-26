import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { Bar } from 'react-chartjs-2';

const Temperature = () => {
  const location = useLocation();
  const { state } = location;

  const [dataTemperature, setDataTemperature] = useState();

  console.log(state.fromTemperature.list)

  useEffect(() => {
    let newData = [];
     function lineChart (arg){
      const loop = arg.map((value, index) => {
        // return <div key={index}>{value.main.feels_like}</div>
        //setDataTemperature(dataTemperature =>[...dataTemperature, value.main.feels_like]);
        return value.main.feels_like
      })
      newData.push(loop);
    };
    console.log("newdata",newData)
      setDataTemperature(newData)
    lineChart(state.fromTemperature.list)
  },[])


  return (
    <div className="main-margin Temperature">
      <div>
        <div>{state.fromTemperature.city.name}</div>
        <div>temperature</div>
      </div>
      <HiOutlineMenuAlt2 />

      {/* {dataTemperature} */}
      {/* BARCHARTS */}
        <Bar
       data={dataTemperature} 
         
      width = {600}
      height = {400}
      options ={{ maintainAspectRatio: false}}
      />  *


      {/* {state.fromTemperature.list.map((value, index) => {
        return <div key={index}>{value.wind.deg}</div>;
      })} */}
    </div>
  );
};

export default Temperature;
