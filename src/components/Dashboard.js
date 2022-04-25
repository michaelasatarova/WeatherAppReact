import React from "react";
import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div className="Dashboard">
      <h1>Hello world</h1>

      <NavLink to="/temperature">Temperature</NavLink>
      <NavLink to="/precipitations">Precipitation</NavLink>
      <NavLink to="/wind">Wind</NavLink>


    </div>
  );
}

export default Dashboard;
