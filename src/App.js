import "./style/index.scss";
import { Routes, Route } from "react-router-dom";
import React, { Component } from "react";
import Dashboard from "./components/Dashboard";
import Temperature from './components/Temperature';
import Precipitation  from "./components/Precipitation";
import  Wind  from "./components/Wind";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Dashboard />} >
            <Route path="" exact element={<Temperature/>} />
            <Route path="precipitations" exact element={<Precipitation/>} />
            <Route path="wind" exact element={<Wind/>} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
