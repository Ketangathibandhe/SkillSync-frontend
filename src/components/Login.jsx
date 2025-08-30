import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import AboutSection from "./AboutSection";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/api/auth/login",
        {
          //axios is a npm package used for api call . we can use fetch also but axios is easy
          emailId,
          password,
        },
        { withCredentials: true }
      );
      //dispatch(addUser(res.data));
      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (error) {
      setError(error?.request?.response || "Something went wrong");
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/api/auth/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-green-400 font-bold text-2xl">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <div className="my-5">
                  <label className="form-control w-full max-w-xs py-4">
                    <div className="label">
                      <span className="label-text px-1"> First Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>

                <div className="my-5">
                  <label className="form-control w-full max-w-xs py-4">
                    <div className="label">
                      <span className="label-text px-1"> Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}

            <div className="my-5">
              <label className="form-control w-full max-w-xs py-4">
                <div className="label">
                  <span className="label-text px-1"> Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>

            <div className="my-5">
              <label className=" form-control w-full max-w-xs ">
                <div className="label ">
                  <span className="label-text px-1"> Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <p className="text-red-400">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn bg-green-400 text-black  px-4 py-2 font-bold rounded-xl"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p
            className=" pt-2 text-center cursor-pointer"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? SignUp Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
    <AboutSection/>
    </>
  );
};

export default Login;
