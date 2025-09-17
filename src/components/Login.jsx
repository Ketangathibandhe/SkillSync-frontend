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
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      navigate("/skillGapForm", { replace: true });
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

const handleSignUp = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/api/auth/signup`,
      { firstName, lastName, emailId, password },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));

    setTimeout(() => {
      navigate("/profile", { replace: true });
    }, 0); 
  } catch (err) {
    console.error("Signup Error:", err);
    setError(err?.response?.data || "Something went wrong");
  }
};


  return (
    <>
      <div className="w-full flex justify-center items-center my-10">
        <div className="card bg-green-100 shadow-sm w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] mx-auto">
          <div className="card-body">
            <h2 className="card-title justify-center text-black font-bold text-2xl">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
            <div className="text-black font-bold w-full">
              {!isLoginForm && (
                <>
                  <div className="my-5 w-full">
                    <label className="form-control w-full py-4">
                      <div className="label">
                        <span className="label-text px-1"> First Name</span>
                      </div>
                      <input
                        type="text"
                        value={firstName}
                        className="input input-bordered w-full bg-gray-200 text-black"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="my-5 w-full">
                    <label className="form-control w-full py-4">
                      <div className="label">
                        <span className="label-text px-1"> Last Name</span>
                      </div>
                      <input
                        type="text"
                        value={lastName}
                        className="input input-bordered w-full bg-gray-200 text-black"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                  </div>
                </>
              )}

              <div className="my-5 w-full">
                <label className="form-control w-full py-4">
                  <div className="label">
                    <span className="label-text px-1"> Email ID</span>
                  </div>
                  <input
                    type="email"
                    value={emailId}
                    className="input input-bordered w-full bg-gray-200 text-black"
                    onChange={(e) => setEmailId(e.target.value)}
                  />
                </label>
              </div>

              <div className="my-5 w-full">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text px-1"> Password</span>
                  </div>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full pr-14 focus:outline-none bg-gray-200 text-black"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-600 text-sm z-20 bg-transparent"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>
              </div>
            </div>

            {error && <p className="text-red-400 text-center">{error}</p>}

            <div className="card-actions justify-center">
              <button
                className="btn bg-green-400 text-black px-4 py-2 font-bold rounded-xl"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "SignUp"}
              </button>
            </div>

            <p
              className="pt-2 text-center cursor-pointer text-black"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm ? "New User? SignUp Here" : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>

      <AboutSection />
    </>
  );
};

export default Login;