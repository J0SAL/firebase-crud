import React from "react";
import { Route, Routes, Switch } from "react-router-dom";
import UserInfo from "./components/signin/UserInfo";
import Login from "./components/signin/Login";
import Register from "./components/signin/Register";
import Home from "./components/Home";
import SignIn from "./components/signin/SignIn";
import AddMovie from "./components/Movies/AddMovie";

function CustomRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/add-movie" element={<AddMovie />} />
    </Routes>
  );
}

export default CustomRoutes;
