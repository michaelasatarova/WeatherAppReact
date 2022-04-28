import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";

import Dashboard from "../components/Dashboard";
import Temperature from "../components/Temperature";
import Precipitation from "../components/Precipitation";
import Wind from "../components/Wind";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />}>
        <Route path="temperture" exact element={<Temperature />} />
        <Route path="precipitations" exact element={<Precipitation />} />
        <Route path="wind" exact element={<Wind />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};


export default Router;
