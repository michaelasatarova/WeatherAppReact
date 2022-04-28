import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";
import Spinner from "./Spinner";

//icons
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudsFill, BsCloudSnowFill, BsCloudSunFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";

const Temperature = (props) => {
  const location = useLocation();
  const { state } = location;
  const [weekWeatherForecast, setWeekWeatherForecast] = useState();
  const [myData, setMyData] = useState();
  const arr = [];

  const handleState = () => {
    const newValue = state.dailyForecast.daily.slice(0, 7);
    setWeekWeatherForecast(newValue);
  };

  useEffect(() => {
    //create date for line chart
    function getTemperature(arg) {
      //loop over array of objects and create a new one
      for (var i = 0; i < arg.length; i++) {
        arr.push({
          x: new Date(arg[i].dt_txt),
          y: Math.round(arg[i].main.feels_like - 273.15),
        });
      }
    }

    getTemperature(state.fromTemperature.list);
    handleState();
    setMyData(arr.slice(0, 5));
  }, []);

  // canva chart data
  //https://mail.google.com/mail/u/0/#starred/FMfcgxwKkHlsMCRLpdcBKhjqvbWbgCQh?compose=CllgCJZbhvHvlGKBHrVJDWqTFKzsKsSPRrdwftcbSRvFLKfbnxCjxzbsfQZzldcBWjmQPPRgbzL

  const options = {
    animationEnabled: true,
    exportEnabled: false,
    theme: "dark2", // "light1", "dark1", "dark2"
    axisY: {
      suffix: "°C",
      interval: 5,
    },
    axisX: {
      interval: 4,
      intervalType: "hour",
    },
    height: 200,
    data: [
      {
        type: "splineArea",
        toolTipContent: "Time {x} - {y}°C",
        color: "rgba(255,255,255,.7)",
        dataPoints: myData,
        xValueType: "dateTime",
        xValueFormatString: "DDD hh:mm TT",
      },
    ],
  };

  //GET DATE
  const getDateName = (arg) => {
    let options = { weekday: "short" };
    const startingDay = new Date(1970, 0, 1); // Epoch
    startingDay.setSeconds(arg);
    const startD = startingDay.toLocaleString("it-It", options);
    return startD.charAt(0).toUpperCase() + startD.slice(1).toLowerCase();
  };

  //GET WEATHER ICO
  const weatherIco = (arg) => {
    if (arg === "Clear") {
      return <MdOutlineWbSunny className="weatherIco" />;
    } else if (arg === "Clouds") {
      return <BsCloudsFill className="weatherIco" />;
    } else if (arg === "Rain") {
      return <FaCloudShowersHeavy className="weatherIco" />;
    } else if (arg === "Snow") {
      return <BsCloudSnowFill className="weatherIco" />;
    } else {
      return <BsCloudSunFill className="weatherIco" />;
    }
  };

  if (weekWeatherForecast) {
    return (
      <div className=" Temperature">
        <div></div>
        <div className="side-margin">
          <div className="row">
            <div>
              <div className="h3">{state.fromTemperature.city.name}</div>
              <div className="subtitle  mt-0">
                {weatherIco(weekWeatherForecast[0].weather[0].main)}
                {Math.round(weekWeatherForecast[0].temp.min - 273.15) + "°C"} -
                {Math.round(weekWeatherForecast[0].temp.max - 273.15) + "°C"}
              </div>
            </div>
            <HiOutlineMenuAlt2 />
          </div>
          <div className="my-1">
            <CanvasJSChart options={options} />
          </div>
        </div>
        <hr className="line my-1" />

        {/*7days forecast */}
        <div className="weatherContainer side-margin">
          {weekWeatherForecast.map((value, index) => {
            return (
              <div className="weatherBox">
                <div className="h5">{getDateName(value.dt)}</div>
                {weatherIco(value.weather[0].main)}
                <div className="dailyTemperature">
                  {Math.round(value.feels_like.day - 273.15) + "°C"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  else{
    return(
      <Spinner/>
    )
   }
};

export default Temperature;
