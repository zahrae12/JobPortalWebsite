import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setVerificationSent(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (verificationSent) {
    return (
      <section className="flex justify-center items-center h-screen">
        <div className="bg-gray rounded-lg shadow-lg p-8 w-3/4 max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-4 text-black">Verification Email Sent</h3>
          <p className="text-lg text-gray-700">A verification email has been sent to <strong>{email}</strong>. Please check your inbox and follow the instructions to verify your email address.</p>
        </div>
      </section>
    );
  }

  return (
    
    <section className="flex justify-center items-center h-screen mt-4">
      <div className=" rounded-lg shadow-lg flex w-3/4 max-w-4xl shadow-md">
        <div className="w-1/2 p-8 shadow_md">
          <h3 className="text-3xl font-bold mb-4 text-center">
            <span className="text-black">Create</span> <span className="text-blue">a new</span> <span className="text-black">account</span>
          </h3>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Register As</label>
              <select
                className="block w-full bg-gray-200 rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:bg-white focus:border-gray"
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input
                className="appearance-none block w-full bg-gray rounded-full border-gray text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaPencilAlt className="items-center mt-5" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-black text-sm font-bold mb-2">Email Address</label>
              <input
                className="appearance-none block w-full bg-gray rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray"
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
              <input
                className="appearance-none block w-full bg-gray rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray"
                type="number"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaPhoneFlip className="items-center mt-5" />
              </div>
            </div>
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                className="appearance-none block w-full bg-gray-200 rounded-full border-light text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray"
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
              className="bg-blue hover:bg-bla text-white font-bold py-2 px-4 block w-full rounded-full border-light:outline-none focus:shadow-outline w-full mt-4"
              type="submit"
            >
              Register
            </button>
            <Link
              className="block text-center mt-4  rounded-full text-gray-700 py-3 px-4 pr-8 rounded focus:outline-none focus:border-gray"
              to={"/login"}
            >
              Login Now
            </Link>
          </form>
        </div>
        <div className="w-1/2 p-8  text-white shadow-md bg-gradient-to-r from-blue-100 to-white">
          <h3 className="text-2xl font-bold mb-4 text-center text-black">About Us</h3>
          <p className="mb-3 text-center text-black dark:text-black">
            Welcome to career Nexus, where students and affiliated companies converge for internships, job opportunities tailored specifically to our university community. Explore tailored opportunities and connect with like-minded individuals to kickstart your career journey today!
          </p>
          <img src="j.jpg" alt="" className="rounded-full h-30 w-30 mx-auto relative max-w-sm" />
          <blockquote>
            <p className="mt-2 mb-3 text-center text-xl italic font-medium text-black dark:text-black">
              You're ONE click away from building a successful career or finding the perfect candidate for your organization!
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default Register;
