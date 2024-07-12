import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import GetAll from "./components/GetAll";

function App() {
  console.log("api", process.env.REACT_APP_APIKEY);
  return (
    <div>
      <Login />
      <Register />
      <GetAll />
    </div>
  );
}

export default App;
