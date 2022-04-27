import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";

//react icons
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import { BsCloudsFill, BsCloudSnowFill, BsCloudSunFill } from "react-icons/bs";
import { FaCloudShowersHeavy } from "react-icons/fa";

const Precipitation = () => {
  const location = useLocation();
  const { state } = location;
  const [weekWeatherForecast, setWeekWeatherForecast] = useState();
    
  const handleState =()=>{
   const newValue = state.fromTest.daily.slice(0,7)
    setWeekWeatherForecast(newValue)
  }
  useEffect(() => {
    handleState()
  }, [])

  //GET DATE
  const getDateName = (arg) => {
    let options = { weekday: 'short'};
    const startingDay = new Date(1970, 0, 1); // Epoch
          startingDay.setSeconds(arg);
    const startD = startingDay.toLocaleString('it-It', options) 
    return startD.charAt(0).toUpperCase()+ startD.slice(1).toLowerCase();
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
  const temperatureInfo = (arg) =>{

    return (Math.round(arg - 273.15)) + "°C"
  }


  if(weekWeatherForecast){
    return (
      <div className=" main-margin Precipitation">
        <h1>Precipitation</h1>
  
        {/* gat date */}
        {/* get weather */}
        {/* gat max min */}
        <div className="weatherContainer">
          {weekWeatherForecast.map((value, index) => {
            return (
              <div className="weatherBox">
                <div className="h5">{getDateName(value.dt)}</div>
                {weatherIco(value.weather[0].main)}
                <div className="dailyTemperature"> {temperatureInfo(value.feels_like.day)}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Precipitation;
