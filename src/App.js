import "./style/index.scss";
import React, { Component } from "react";
import Router from "./routs/Routs";

class App extends Component {

  constructor(props) {
    super(props);  
    this.state = {
      today:0,
    };
    this.handleBackground()
  }   

    handleBackground = () => {
      let today = new Date()
      let hour = today.getHours()
      this.setState({today: hour});
    };

  render() {
    return (
      <div className={this.state.today > 7 && this.state.today < 20  ? "App backgroundNight" : "App backgroundDay"}>
        <Router/>
      </div>
    );
  }
}

export default App;
