import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom"; //outlet is where nested render should shown
import axios from "axios";

//react icons
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";

export const Dashboard = () => {
  const [data, setData] = useState();
  const [today, setToday] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    //fetch data
    async function check() {
      const result = await axios(
        "https://api.openweathermap.org/data/2.5/forecast?lat=47.5596&lon=7.5886&&appid=84d45d70ec8cb3346455466a3a04b5ee"
      );
      console.log("data", result.data);
      setData(result.data);
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
    check();
  }, []);

  //toggle sidebar
  const toggleMenu = () => {
    setToggle((toggle) => !toggle);
  };

  if (data) {
    return (
      <div className="Dashboard">
        <div>
          <div className="row">
            <div>IMN</div>
            <div onClick={toggleMenu}>
              <HiOutlineMenuAlt2 />
            </div>
          </div>

          <div className="currentWeatherData">
            <div className="currentWeatherDataBox flex">
              <MdOutlineWbSunny className="weatherIco" />
              {/* convert kalvin to celsius  1°C = 274.15*/}
              <div className="h1">{Math.round(data.list[0].main.feels_like - 273.15) } °C</div>
            </div>
            <div className="currentWeatherDataBox">
              <div className="h2">{data.city.name}</div>
              <div className="subtitle m-0">{data.city.name} ({data.city.country}) </div>
            </div>
            <div className="currentWeatherDataBox subtitle mt-3">05:30 -- Sabado 10 de Augusto 2019</div>
          </div>

        </div>

        {toggle ? (
          <div className="sidebar">
            <div className="overlay"></div>
            <div className="sidebarContent">
              <div className="main-margin">
                <div className="sidebar-title">
                  Prognóstico Regional del Tiempo
                </div>
                <div className="subtitle">{today}</div>
              </div>
              <nav className=" main-margin navigation">
                <NavLink
                  to={{
                    pathname: "/",
                    userProps: { name: "This is my props" },
                  }}
                >
                  Temperature
                </NavLink>
                <NavLink to="/precipitations">Precipitation</NavLink>
                <NavLink
                  to={{ pathname: "/wind" }}
                  state={{ from: "This is my props" }}
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
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
};
