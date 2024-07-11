import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowJobPortalWorks = () => {
  return (
    <section className="how-it-works bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How Job Portal Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="step bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="icon bg-blue-500 text-white w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
              <FaUserPlus className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Create Account</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.</p>
          </div>
          <div className="step bg-blue text-white p-6 rounded-lg shadow-lg text-center">
            <div className="icon bg-white text-blue-500 w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
              <MdFindInPage className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find a Job/Post a Job</h3>
            <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.</p>
          </div>
          <div className="step bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="icon bg-blue-500 text-white w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center">
              <IoMdSend className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Apply For Job/Recruit Suitable Candidates</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, culpa.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowJobPortalWorks;
