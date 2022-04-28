import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

//react icons
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudsFill, BsCloudSnowFill, BsCloudSunFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";

const CarouselComp = (props) => {
  const [date, setDate] = useState();
  const [today, setToday] = useState("");

  useEffect(() => {
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
  }, []);

  //date from api
  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  //GET CURRENT DATE
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
    return <p>{correctTime}</p>;
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

  return (
    <div>
      <Carousel showThumbs={false}>
        {props.data.list.map((item, index) => (
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
                <h2 className="h2">{props.data.city.name} </h2>
                <div className="subtitle m-0">
                  {props.data.city.name} ({props.data.city.country})
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
  );
};

export default CarouselComp;
