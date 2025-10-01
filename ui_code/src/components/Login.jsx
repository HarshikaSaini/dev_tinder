import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { addUser } from "../redux/userSlice";

const Login = () => {
  const [email, setEmail] = useState("harshika@gmail.com");
  const [password, setPassword] = useState("Harshika@123");
  const [error,setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); //dispatches an action
      navigate("/feed")
    } catch (error) { 
      setError(error?.response?.data?.mess || "Something went wrong !" )
    }
  };
  
  return (
    <div className="flex justify-center items-center h-100">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend text-2xl">Login Form</legend>

        <label htmlFor="email" className="label text-md">
          Email
        </label>
        <input
          type="email"
          id="email"
          name={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input outline-none focus:outline-none mb-4"
          placeholder="Enter your email"
        />

        <label htmlFor="password" className="label text-md">
          Password
        </label>
        <input
          type="password"
          id="password"
          name={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input outline-none focus:outline-none mb-2"
          placeholder="Enter your password"
        />
        <p className={`min-h-4 pl-1 ${error ? "text-red-500" : "invisible"}`}>{error}</p>
        <button onClick={handleLogin} className="btn btn-neutral mt-3">
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
