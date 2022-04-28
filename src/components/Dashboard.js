import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; //outlet is where nested render should shown
import axios from "axios";

// //react icons
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

//carousel
import CarouselComp from "./CarouselComp";
import Spinner from "./Spinner";

const Dashboard = () => {
  const [data, setData] = useState(); //short forecast
  const [dataWeather, setDataWeather] = useState(); //long forecast
  const [today, setToday] = useState("");
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    //fetch data  narmally API KEYS should be in .env variable
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

  if (data && dataWeather) {
    return (
      <div className={!toggle ? " " : "Dashboard"}>
        <div>
          <div className="row2 p-5">
            <div>IMN</div>
            <div onClick={toggleMenu} className="cursor">
              <HiOutlineMenuAlt2 />
            </div>
          </div>
          <CarouselComp data={data} />
        </div>

        {toggle ? (
          <div className={!toggle ? "none" : "sidebar"}>
            <div className="overlay">
              <div className="pages ">
                <div className="naviBox ">
                  <AiOutlineArrowLeft className="mx-1" />
                  <span>Previous</span>
                </div>
                <div className="naviBox activeBox">
                  <span>Next</span>
                  <AiOutlineArrowRight className="mx-1" />
                </div>
              </div>
            </div>
            <div className="sidebarContent">
              <div className="main-margin">
                <h1 className="h4">Prognóstico Regional del Tiempo</h1>
                <div className="subtitle">{today}</div>
              </div>
              <nav className=" main-margin navigation">
                <NavLink
                  to={{ pathname: "/temperture" }}
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
              <Outlet />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  else{
   return(
     <Spinner/>
   )
  }
};

export default Dashboard;
