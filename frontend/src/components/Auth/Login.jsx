import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { useSpring, animated } from "@react-spring/web";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
    
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white flex items-center justify-center">
      <section className="flex justify-center items-center h-screen w-full mt-0">
        <animated.div className="w-full max-w-4xl flex rounded-lg shadow-md bg-white">
          <div className="w-1/2  flex flex-col justify-center items-center p-8">
            <div className="grid grid-cols-2 gap-4">
              <img src="/A.png" alt="GIF Animation" className="col-span-2 w-full h-full"/>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 flex justify-center items-center">
            <div className="p-8">
              <h3 className="text-3xl font-bold mb-4 text-center mt-4 mb-4">
                <span className="text-black">Get</span> <span className="text-black">Started</span> <span className="text-black">Now!</span>
              </h3>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Login</label>
                  <select
                    className="block w-full bg-blue-100 rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray-500 mt-4"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="Company">Company</option>
                    <option value="Student">Student</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <FaRegUser className="items-center mt-5" />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input
                    className="appearance-none block w-full bg-blue-100 rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    placeholder="name@etu.uae.ac.ma"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <MdOutlineMailOutline className="items-center mt-5" />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                  <input
                    className="appearance-none block w-full bg-blue-100 rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <RiLock2Fill className="items-center mt-5" />
                  </div>
                </div>
                <button
                  className="bg-blue hover:bg-bl text-white font-bold py-2 px-4 block w-full rounded-full border-light:outline-none focus:shadow-outline w-full mt-4"
                  type="submit"
                >
                  Login
                </button>
                <Link
                  className="block text-center mt-4 bg-gray-200 rounded-full text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray-500"
                  to={"/register"}
                >
                  Register Now
                </Link>
              </form>
            </div>
          </div>
        </animated.div>
      </section>
    </div>
  );
};

export default Login;
