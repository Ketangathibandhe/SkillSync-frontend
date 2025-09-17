import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import light from "../images/light.png";
import { removeUser } from "../utils/userSlice";
import { resetSkillState } from "../utils/skillSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      dispatch(resetSkillState());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="navbar bg-green-200 shadow-sm px-4 flex flex-wrap justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Link to="/skillGapForm">
          <img src={light} alt="SkillSync Logo" className="w-32 sm:w-48" />
        </Link>
      </div>

      {/* Name + Profile + Arrow */}
      <div className="dropdown dropdown-end flex items-center gap-1">
        {/* Name */}
        <span className="font-mono text-black text-xl">
          {user ? user.firstName : "Login"}
        </span>

        {/* Profile Image with Arrow */}
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar relative"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              alt="User photo"
              src={
                user
                  ? user.photoUrl
                  : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
            />
          </div>


          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-600 absolute -bottom-3 left-1/2 -translate-x-1/2 pt-2.5"
            style={{ marginTop: "6px" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>


        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-green-100 rounded-box mt-60 w-52 p-2 shadow text-black z-[999]"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Profile <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link to="/roadmap" className="justify-between">
              Saved Roadmaps
            </Link>
          </li>
          <li>
            <Link to="/skillGapForm" className="justify-between">
              SkillGap Analysis
            </Link>
          </li>
          <li>
            <Link to="/forgotpassword" className="justify-between">
              ForgotPassword
            </Link>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
