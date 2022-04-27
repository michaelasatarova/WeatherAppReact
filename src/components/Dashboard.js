import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; //outlet is where nested render should shown
import axios from "axios";

//react icons
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudsFill, BsCloudSnowFill, BsCloudSunFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Dashboard = () => {
  //wether forecast api
  const [data, setData] = useState(); //short forecast
  const [dataWeather, setDataWeather] = useState(); //long forecast

  //date and time settings
  const [today, setToday] = useState("");
  const [date, setDate] = useState();

  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    //fetch data
    async function hoursForecats() {
      const result = await axios(
        "https://api.openweathermap.org/data/2.5/forecast?lat=47.5596&lon=7.5886&cnt=5&appid=84d45d70ec8cb3346455466a3a04b5ee"
      );
      setData(result.data);
    }

    async function daysForecats() {
      const result = await axios(
        "https://api.openweathermap.org/data/2.5/onecall?lat=47.5596&lon=7.5886&cnt=7&appid=84d45d70ec8cb3346455466a3a04b5ee"
      );

      setDataWeather(result.data);
    }

    //date today
    const today = () => {
      let dayToday = new Date();
      let date =
        dayToday.getDate() +
        " " +
        dayToday.toLocaleDateString("default", { month: "long" }) +
        " " +
        dayToday.getFullYear();

      setToday(date);
    };

    today();
    hoursForecats();
    daysForecats();
  }, []);

  //toggle sidebar
  const toggleMenu = () => {
    setToggle((toggle) => !toggle);
  };

  //date from api
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  const correctDate = (arg) => {
    let postDate = Date.parse(arg);
    //get current date and convert it to  miliseconds
    let time = new Date(postDate).getTime();
    let date = new Date(time);

    let h = date.getHours();
    let m = date.getMinutes();
    // add a zero in front of numbers<10
    h = checkTime(h);
    m = checkTime(m);

    let correctDate = date.toDateString();
    let correctTime = h + ":" + m + " -  " + correctDate;
    // setDate(correctTime);
    return <p>{correctTime}</p>;
  };

  //change icon based on weather
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

  if (data && dataWeather) {
    return (
      <div className={ !toggle ? " ": "Dashboard"}>
        <div>
          <div className="row2 p-5">
            <div>IMN</div>
            <div onClick={toggleMenu} className="cursor">
              <HiOutlineMenuAlt2 />
            </div>
          </div>
          {}
          <Carousel showThumbs={false}>
            {data.list.map((item, index) => (
              <div key={index}>
                <div className="currentWeatherData">
                  <div className="currentWeatherDataBox flex">
                    {weatherIco(item.weather[0].main)}
                    {/* convert kalvin to celsius  1°C = 274.15*/}
                    <div className="h1">
                      {Math.round(item.main.feels_like - 273.15)} °C
                    </div>
                  </div>
                  <div className="currentWeatherDataBox">
                    <h2 className="h2">{data.city.name} </h2>
                    <div className="subtitle m-0">
                      {data.city.name} ({data.city.country})
                    </div>
                  </div>
                  <div className="currentWeatherDataBox subtitle mt-3">
                    {correctDate(item.dt_txt)}
                    {date}
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {toggle ? (
          <div className={ !toggle ? "none": "sidebar"}>
            <div className="overlay">
            <div className="pages ">
                <div className="naviBox ">
                  <AiOutlineArrowLeft className="mx-1"/>
                  <span>Previous</span>
                </div>
                <div className="naviBox activeBox">
                  <span>Next</span>
                  <AiOutlineArrowRight className="mx-1"/>
                </div>
              </div>
            </div>
            <div className="sidebarContent">
              <div className="main-margin">
                <h1 className="h4">
                  Prognóstico Regional del Tiempo
                </h1>
                <div className="subtitle">{today}</div>
              </div>
              <nav className=" main-margin navigation">
                <NavLink
                  to={{ pathname: "/" }}
                  state={{ fromTemperature: data, dailyForecast: dataWeather }}
                >
                  Temperature
                </NavLink>
                <NavLink
                  to={{ pathname: "/precipitations" }}
                  state={{ fromTest: dataWeather }}
                >
                  Precipitation
                </NavLink>
                <NavLink
                  to={{ pathname: "/wind" }}
                  state={{ from: dataWeather }}
                >
                  Wind
                </NavLink>
              </nav>
              <hr className="line" />

              {/* <ul>
                {data.list.map((value, index) => {
                  return <li key={index}>{value.dt}</li>;
                })}
              </ul> */}
              <Outlet />
            </div>

              {/* next-prev-page */}
              {/* <div className="pages ">
                <div className="naviBox ">
                  <AiOutlineArrowLeft className="mx-1"/>
                  <span>Previous</span>
                </div>
                <div className="naviBox activeBox">
                  <span>Next</span>
                  <AiOutlineArrowRight className="mx-1"/>
                </div>
              </div> */}
            
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default Dashboard;
