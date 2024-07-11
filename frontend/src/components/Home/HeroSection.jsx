import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Students",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  
  return (
    <>
      <div className="heroSection">
        <div className="container6 p-6">
          <div className="title">
            <h1 className='text-l font-semibold'>
               <span className="text-black">University-Industry <span className="text-blue">Partnership</span> Your Gateway</span> to <span className="text-black">Success</span> 
            </h1>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Welcome to career Nexus , the premier platform designed to link university students with top Collaborative companies. Discover opportunities, build your career, and collaborate with industry leaders to shape a brighter future.
          
            </p>
            <div className="sing rounded-full flex mt-4">
           <Link to="/job/getall" className="sing rounded-full text-white px-5 py-2 bg-gradient-to-r from-blue via-pink to-bla hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-bl dark:focus:ring-blue font-medium ">
          Start Now
        </Link>
       </div>

          </div>
          <div className="image">
            <img src="/team.jpg" alt="hero" className="w-full h-auto" />
          </div>
        </div>
        <div className="detailss flex justify-around mt-8">
          {details.map(element => (
            <div className="cardss shadow bg-white text-black p-5 rounded-lg text-center" key={element.id}>
              <div className="iconss text-2xl mb-2">{element.icon}</div>
              <div className="contentss">
                <p className="text-xl">{element.title}</p>
                <p className="text-sm text-gray-500">{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
