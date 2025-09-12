import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Text from "./components/Text";
import RoadmapPage from "./components/RoadmapPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPasswordForm />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Text />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="roadmap" element={<RoadmapPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;