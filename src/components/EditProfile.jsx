import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
const EditProfile = () => {
  const user = useSelector((state) => state.user);

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
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <div className="mb-16">
      <div className="flex justify-center gap-10">
        <div className="flex justify-center my-5 ">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center text-green-400 text-2xl">
                Edit Profile
              </h2>
              <div>
                <div className="my-4">
                  <label className="form-control w-full max-w-xs py-4">
                    <div className="label">
                      <span className="label-text px-1">First Name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>

                <div className="my-4">
                  <label className=" form-control w-full max-w-xs ">
                    <div className="label ">
                      <span className="label-text px-1"> Last Name</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>

                <div className="my-4">
                  <label className=" form-control w-full max-w-xs ">
                    <div className="label ">
                      <span className="label-text px-1">Photo URL</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </label>
                </div>

                <div className="my-4">
                  <label className=" form-control w-full max-w-xs ">
                    <div className="label ">
                      <span className="label-text px-1"> Age </span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>

                <div className="my-4">
                  <label className=" form-control w-full max-w-xs ">
                    <div className="label ">
                      <span className="label-text px-1">Gender</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </label>
                </div>

                <div className="my-4">
                  <label className=" form-control w-full max-w-xs ">
                    <div className="label ">
                      <span className="label-text px-1"> About</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <p>{error}</p>
              <div className="card-actions justify-center">
                <button
                  onClick={saveProfile}
                  className="btn text-black bg-green-400"
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
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
