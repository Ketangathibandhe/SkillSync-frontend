import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/profile/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setLoading(false);
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
      } else {
        console.error("Error fetching user data:", err);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  return <Outlet />; // Navbar/Footer Layout me hai
};

export default Home;