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
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Text from "./components/Text";
import RoadmapPage from "./components/RoadmapPage";
import SkillGapForm from "./components/SkillGapForm"; // tumhara form component
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
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />
            <Route path="forgotpassword" element={<ForgotPasswordForm />} />

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