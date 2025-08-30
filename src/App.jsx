import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<EditProfile/>} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
