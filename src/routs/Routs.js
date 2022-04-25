import React from "react";
import { Routes, Route } from "react-router-dom";

//Layouts
import Dashboard from "../components/Dashboard";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
    </Routes>
  );
};

//add test
export default MyRoutes;
