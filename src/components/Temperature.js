import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CanvasJSChart } from "canvasjs-react-charts";

//icons
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudsFill, BsCloudSnowFill, BsCloudSunFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const Temperature = () => {
  const location = useLocation();
  const { state } = location;
  // const [minTemp, setMinTemp] = useState(); //maximal and minimal temperature
  // const [maxTemp, setMaxTemp] = useState(); //maximal and minimal temperature
  const [weekWeatherForecast, setWeekWeatherForecast] = useState();
  const [myData, setMyData] = useState();
  const arr = [];

  const handleState = () => {
    const newValue = state.dailyForecast.daily.slice(0, 7);
    console.log("NEW VALLUE",newValue);
    setWeekWeatherForecast(newValue);
  };

  const convertToHours = (arg) => {
let postDate = Date.parse(arg);
//get current date and convert it to  miliseconds
let time = new Date(postDate).getTime();
let date = new Date(time);
let h = date.getHours();
console.log("date", new Date(arg) )

 return new Date(arg);

// const startingDay = new Date(1970, 0, 1); // Epoch
// startingDay.setSeconds(arg);
// console.log(startingDay)

  };

  // const test =(arg)=>{
  //   let nwm = arg.map(x =>  Math.round(x.main.feels_like - 273.15) )
  //   setMinTemp(Math.min(...nwm));
  //   setMaxTemp(Math.max(...nwm));
  // }

  useEffect(() => {
    function getTemperature(arg) {
      //loop over array of objects and create a new one
      for (var i = 0; i < arg.length; i++) {
        console.log("data to push",arg[i].dt);
        arr.push({
           x: convertToHours(arg[i].dt_txt),
           y: Math.round(arg[i].main.feels_like - 273.15),
          // x:convertToHours(arg[i].dt),
        });
      }
    }

    getTemperature(state.fromTemperature.list);
    handleState();
    setMyData(arr.slice(0,5));
    console.log("arr", arr);
    //test(state.fromTemperature.list);
  }, []);

  // canva chart
  //https://mail.google.com/mail/u/0/#starred/FMfcgxwKkHlsMCRLpdcBKhjqvbWbgCQh?compose=CllgCJZbhvHvlGKBHrVJDWqTFKzsKsSPRrdwftcbSRvFLKfbnxCjxzbsfQZzldcBWjmQPPRgbzL

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
      //suffix: ":00",
      interval: 4,
      intervalType: "hour", 
    },
    height: 200,
    data: [
      {
        type: "splineArea",
        toolTipContent: "Time {x}:00 - {y}°C",
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

  //GET TEMPERATURE
  const temperatureInfo = (arg) => {
    return Math.round(arg - 273.15) + "°C";
  };

  if (weekWeatherForecast) {
    return (
      <div className=" Temperature">
        <div className="side-margin">
          <div className="row">
            <div>
              <div className="h3">{state.fromTemperature.city.name}</div>
              <div className="subtitle  mt-0">
                   {weatherIco(weekWeatherForecast[0].weather[0].main)} {temperatureInfo(weekWeatherForecast[0].temp.min)} - {temperatureInfo(weekWeatherForecast[0].temp.max)}
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
                <div className="dayInWeek">{getDateName(value.dt)}</div>
                {weatherIco(value.weather[0].main)}
                <div className="dailyTemperature">
                  {" "}
                  {temperatureInfo(value.feels_like.day)}
                </div>
              </div>
            );
          })}
        </div>

        {/* next-prev-page */}

        </div>
    );
  }
};

export default Temperature;
