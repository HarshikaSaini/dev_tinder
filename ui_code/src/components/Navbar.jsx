import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import {addRequest} from "../redux/requestSlice";
const Navbar = () => {
  const user = useSelector((store) => store.user); // selecting the state from the store
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.log("Error in logging out", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/user/request/received",
        { withCredentials: true }
      );
      if (res.status == 200) {
        dispatch(addRequest(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      fetchRequests();
  }, []);

  return (
    <div className="pr-4 navbar bg-base-300 shadow-sm ">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-6 items-center">
          <div
            className="indicator cursor-pointer relative"
            onClick={() => setShow((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="whitesmoke"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            <span className="badge badge-xs badge-primary indicator-item">
              {request && request.length}
            </span>
            {show && <Notification  />}
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user-img" src={user?.data?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li onClick={handleLogout}>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
