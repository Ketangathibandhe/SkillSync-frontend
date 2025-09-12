import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        BASE_URL + "/api/profile/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      // Show toast (optional)
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      // Redirect to SkillGapForm after save
      navigate("/skillGapForm", { replace: true });
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="w-full flex justify-center items-center my-10 px-4 mb-24">
      <div className="card bg-green-100 shadow-sm 
                      w-full max-w-[95%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] 
                      mx-auto">
        <div className="card-body">
          <h2 className="card-title justify-center text-black font-bold text-2xl">
            Edit Profile
          </h2>

          <div className="text-black font-bold w-full">
            {/* First Name */}
            <div className="my-5 w-full">
              <label className="form-control w-full py-4">
                <div className="label">
                  <span className="label-text px-1">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full bg-gray-200 text-black"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>

            {/* Last Name */}
            <div className="my-5 w-full">
              <label className="form-control w-full py-4">
                <div className="label">
                  <span className="label-text px-1">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full bg-gray-200 text-black"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            {/* Photo URL */}
            <div className="my-5 w-full">
              <label className="form-control w-full py-4">
                <div className="label">
                  <span className="label-text px-1">Photo URL</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full bg-gray-200 text-black"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>

            {/* Age */}
            <div className="my-5 w-full">
              <label className="form-control w-full py-4">
                <div className="label">
                  <span className="label-text px-1">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full bg-gray-200 text-black"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>

            {/* Gender */}
            <div className="my-5 w-full">
              <label className="form-control w-full py-4">
                <div className="label">
                  <span className="label-text px-1">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full bg-gray-200 text-black"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>

            {/* About */}
            <div className="my-5 w-full">
              <label className="form-control w-full py-4">
                <div className="label">
                  <span className="label-text px-1">About</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full bg-gray-200 text-black"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* Error */}
          <p className="text-red-400">{error}</p>

          {/* Save Button */}
          <div className="card-actions justify-center">
            <button
              onClick={saveProfile}
              className="btn bg-green-400 text-black px-4 py-2 font-bold rounded-xl"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;