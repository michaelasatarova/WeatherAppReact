import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import { CanvasJSChart } from "canvasjs-react-charts";

const Temperature = () => {
  const location = useLocation();
  const { state } = location;
  const arr = [];

const convertToHours =(arg) =>{
  let postDate = Date.parse(arg);
  //get current date and convert it to  miliseconds
  let time = new Date(postDate).getTime();
  let date = new Date(time);
  
  let h = date.getHours();
  return h
}

  useEffect(() => {
    function getTemperature(arg) {;

      const result = [];
      for (var i = 0; i < arg.length; i++) {
        console.log(arg[i]);

        arr.push({
          x: convertToHours(arg[i].dt_txt),
          y: Math.round(arg[i].main.feels_like - 273.15)
        });
      }
    }

    getTemperature(state.fromTemperature.list);
  
  }, []);


  // canva
  const options = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "",
    },
    axisY: {
      title: "",
      suffix: "°C",
      interval: 5,
    },
    axisX: {
      title: "",
      suffix: ":00",
      interval: 4,
    },
    height: 200,
    data: [
      {
        type: "line",
        toolTipContent: "Time {x}:00 - {y}°C",
        dataPoints: arr,
      },
    ],
  };

  return (
    <div className="main-margin Temperature">
      <div>
        <div>{state.fromTemperature.city.name}</div>
        <div>temperature</div>
      </div>
      <HiOutlineMenuAlt2 />

      <CanvasJSChart options={options} />   
    </div>
  );
};

export default Temperature;
