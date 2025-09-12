import "./App.css";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";

import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Text from "./components/Text";
import RoadmapPage from "./components/RoadmapPage";
import SkillGapForm from "./components/SkillGapForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

// Layout with Navbar + Footer
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  // Redux state access directly in App.jsx
  const user = useSelector((state) => state.user);

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes with inline redirect if already logged in */}
            <Route
              path="login"
              element={
                user && user.emailId ? (
                  <Navigate to="/skillGapForm" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="forgotpassword"
              element={
                user && user.emailId ? (
                  <Navigate to="/skillGapForm" replace />
                ) : (
                  <ForgotPasswordForm />
                )
              }
            />

            {/* Protected Routes */}
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="roadmap"
              element={
                <ProtectedRoute>
                  <RoadmapPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="text"
              element={
                <ProtectedRoute>
                  <Text />
                </ProtectedRoute>
              }
            />
            <Route
              path="skillGapForm"
              element={
                <ProtectedRoute>
                  <SkillGapForm />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;