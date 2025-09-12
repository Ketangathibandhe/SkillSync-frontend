// import { useState } from "react";
// import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./components/Home";
// import appStore from "./utils/appStore";
// import { Provider } from "react-redux";
// import Login from "./components/Login";
// import EditProfile from "./components/EditProfile";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
// import Text from "./components/Text";
// import RoadmapPage from "./components/RoadmapPage";
// function App() {
//   return (
//     <Provider store={appStore}>
//       <BrowserRouter basename="/">
//         <Routes>
//           <Route path="/" element={<Home/>}>
//             <Route path="/" element={<Text/>} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/profile" element={<EditProfile/>} />
//             <Route path="/forgotpassword" element={<ForgotPasswordForm/>} />
//              <Route path="/roadmap" element={<RoadmapPage />} />

//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;

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

// Inline PublicRoute logic
const PublicPage = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (user && user.emailId) {
    return <Navigate to="/skillGapForm" replace />;
  }
  return children;
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes with inline check */}
            <Route
              path="login"
              element={
                <PublicPage>
                  <Login />
                </PublicPage>
              }
            />
            <Route
              path="forgotpassword"
              element={
                <PublicPage>
                  <ForgotPasswordForm />
                </PublicPage>
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