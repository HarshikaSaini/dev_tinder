import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-100">
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
      <legend className="fieldset-legend text-xl">Login Form</legend>

      <label className="label text-md">Email</label>
      <input type="email" className="input outline-none focus:outline-none" placeholder="Email" />

      <label className="label text-md">Password</label>
      <input type="password" className="input outline-none focus:outline-none" placeholder="Password" />

      <button className="btn btn-neutral mt-4">Login</button>
    </fieldset>
    </div>
  );
};

export default Login;
