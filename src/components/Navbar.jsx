// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";
// import light from "../images/light.PNG";
// import { removeUser } from "../utils/userSlice";
// function NavBar() {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const Navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         BASE_URL + "/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUser());
//       return Navigate("/login");
//     } catch (err) {
//       console.error("Logout failed", err);
//     }
//   };
//   return (
//     <div>
//       <div className="navbar bg-green-200 shadow-sm">
//         <div className="flex-1">
//           <img src={light} alt="img" className="ml-5 w-48" />
//         </div>
//         <div className="flex gap-2">
//           <p className="m-auto font-mono text-black">
//             {user ? user.firstName : "Login"}
//           </p>
//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full ">
//                 <img
//                   alt="User photo "
//                   src={
//                     user
//                       ? user.photoUrl
//                       : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                   }
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-green-100 rounded-box z-1 mt-4 w-52 p-2 shadow text-black"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBar;


import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // ✅ fix: useRouter → useRouterDom
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import light from "../images/light.PNG";
import { removeUser } from "../utils/userSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // ✅ fix: lowercase 'navigate'

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/api/auth/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>
      <div className="navbar bg-green-200 shadow-sm">
        <div className="flex-1">
          <img src={light} alt="img" className="ml-5 w-48" />
        </div>
        <div className="flex gap-2">
          <p className="m-auto font-mono text-black">
            {user ? user.firstName : "Login"}
          </p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User photo"
                  src={
                    user
                      ? user.photoUrl
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-green-100 rounded-box z-1 mt-4 w-52 p-2 shadow text-black"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;