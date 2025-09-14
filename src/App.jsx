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

// Set axios to send credentials (cookies) by default for all requests
axios.defaults.withCredentials = true;

// Layout with Navbar + Footer
const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

// Redirect away from public pages if already logged in
const PublicPage = ({ children }) => {
  const user = useSelector((state) => state.user);
  if (user && user.emailId) return <Navigate to="/skillGapForm" replace />;
  return children;
};

// Load auth state once for the whole app (refresh-safe + validate session with backend)
const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchUser = async () => {
      try {
        // Always attempt a backend validation call on app start.
        // This ensures localStorage-based user is validated against server session/cookie.
        const res = await axios.get(`${BASE_URL}/api/profile/profile/view`, {
          withCredentials: true,
        });
        if (!mounted) return;
        // If backend returns user, update store (also writes to localStorage via addUser)
        dispatch(addUser(res.data));
      } catch (err) {
        // If validation fails (e.g., 401), ensure client clears local user state so UI matches server.
        if (!mounted) return;
        dispatch(removeUser());
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    // Call fetchUser regardless of whether `user` exists in localStorage.
    // This avoids a stale-localstate situation when server cookie/session is missing.
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
              {/* Forgot password public for both logged-in and logged-out */}
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
