import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./redux/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
 
  const fetchProfile = async () => {
    if(user) return
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/profile/view",
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      else console.log(error);
    }
  };

  useEffect(() => {
      fetchProfile();
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-y-auto p-3">
      <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
