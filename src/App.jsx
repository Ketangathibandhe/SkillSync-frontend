// path: src/App.jsx
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import appStore from "./utils/appStore";
import { addUser, removeUser } from "./utils/userSlice";
import { BASE_URL } from "./utils/constants";

// Pages
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import RoadmapPage from "./components/RoadmapPage";
import SkillGapForm from "./components/SkillGapForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// axios default config to send cookies
axios.defaults.withCredentials = true;

// Layout wrapper
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Redirect logged-in users away from login/signup
const PublicPage = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (user && user.emailId) return <Navigate to="/skillGapForm" replace />;
  return children;
};

// AuthLoader to validate user on app start
const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        // Backend call to check cookie/session
        const res = await axios.get(`${BASE_URL}/api/profile/profile/view`);
        if (!mounted) return;
        dispatch(addUser(res.data)); // update Redux + localStorage
      } catch (err) {
        if (!mounted) return;
        dispatch(removeUser()); // clear local state if session invalid
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  return children;
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <AuthLoader>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route
                path="login"
                element={
                  <PublicPage>
                    <Login />
                  </PublicPage>
                }
              />
              <Route path="forgotpassword" element={<ForgotPasswordForm />} />

              {/* Protected routes */}
              <Route
                index
                element={
                  <ProtectedRoute>
                    <SkillGapForm />
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
            </Route>
          </Routes>
        </AuthLoader>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
