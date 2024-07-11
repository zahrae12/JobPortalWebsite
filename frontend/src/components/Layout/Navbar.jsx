import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className={`bg-blue-700 text-black shadow-md ${isAuthorized ? "navbarShow" : "navbarHide"}`}>
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 flex justify-between items-center py-6">
        <div className="flex items-center justify-between">
          <img src="/logo.png" alt="logo" style={{ width: '50px', height: '50px' }} />
          <h1 className="ml-2 text-xl font-semibold">Career Nexus</h1>
        </div>
        <div className="hidden md:flex gap-12">
          <ul className={`hidden md:flex gap-12 items-center ${show ? "hidden" : "flex"}`}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)} className="text-base hover:text-blue">
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)} className="text-base hover:text-blue-600">
                Search jobs
              </Link>
            </li>
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)} className="text-base hover:text-blue-600">
                {user && user.role === "Company"
                  ? "Student's applications"
                  : "My Applications"}
              </Link>
            </li>
            {user && user.role === "Company" && (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)} className="text-base hover:text-blue-600">
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)} className="text-base hover:text-blue-600">
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            )}
            <div className="flex">
              {!isAuthorized ? (
                <button onClick={handleLogout} className="text-base border border-blue rounded px-3 py-1 py-2 px-5 border rounded bg-blue-700 hover:bg-blue-800 hover:border-blue-800 text-white bg-blue mr-2">LOGIN</button>
              ) : (
                <button onClick={handleLogout} className="text-base border border-blue rounded px-3 py-1 py-2 px-5 border rounded bg-blue-700 hover:bg-blue-800 hover:border-blue-800 text-white bg-blue">LOGOUT</button>
              )}
            </div>
          </ul>
        </div>
        <div className="md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
