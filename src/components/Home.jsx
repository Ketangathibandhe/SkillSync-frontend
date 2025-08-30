import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import Text from './Text';
const Home = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(store => store.user)
  const featchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/profile/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401){
        navigate("/login");
      }
      console.error("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    if(!userData){
     featchUser();
     }
  }, []);

  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default Home