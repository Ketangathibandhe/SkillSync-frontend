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
import { addUser } from "./utils/userSlice";
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

// Load auth state once for the whole app (refresh-safe)
const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile/profile/view`, {
          withCredentials: true,
        });
        if (mounted) dispatch(addUser(res.data));
      } catch {
        // not logged in is fine
      } finally {
        if (mounted) setLoading(false);
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
              <Route
                path="forgotpassword"
                element={
                  <ForgotPasswordForm />
                }
              />

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
