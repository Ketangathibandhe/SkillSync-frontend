import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const ForgotPasswordForm = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = async () => {
    setError("");
    setMessage("");

    try {
      const res = await axios.put(
        BASE_URL + "/api/profile/profile/forgotPassword",
        { emailId, password },
        { withCredentials: true }
      );
      setMessage(res.data);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4 my-10">
      <div className="card bg-green-100 w-full max-w-sm shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-black font-bold text-2xl">
            Reset Password
          </h2>

          {/* Email */}
          <div className="my-5">
            <label className="form-control w-full py-4">
              <div className="label">
                <span className="label-text text-black px-1">Email ID</span>
              </div>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full text-white"
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </label>
          </div>

          {/* New Password */}
          <div className="my-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text text-black px-1">New Password</span>
              </div>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full pr-14 focus:outline-none text-white"
                  required
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

          {/* Error / Success */}
          {error && <p className="text-red-400">{error}</p>}
          {message && <p className="text-green-400">{message}</p>}

          {/* Button */}
          <div className="card-actions justify-center">
            <button
              className="btn bg-green-400 text-black px-4 py-2 font-bold rounded-xl"
              onClick={handleReset}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;