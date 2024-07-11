import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FaMapMarkerAlt, FaMoneyBillWave, FaCity, FaGlobe, FaClock } from "react-icons/fa";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return; // Stop further execution of useEffect
    }

    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, isAuthorized, navigateTo]);

  // Function to format date as "day/month/year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    
    <section className="jobDetail bg-white py-8">
      <h1 className="text-3xl font-semibold mb-4 text-center">Job Details</h1>
      {Object.keys(job).length === 0 ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          <div className="left-sec rounded-lg shadow p-6 mb-8 md:w-1/3 md:mr-8 flex flex-col items-center shadow-xl bg-blue-100">
            <img src={job.companyLogo} alt="Company Logo" className="w-32 h-32 rounded-full mb-4 mt-6" />
            {user && user.role !== "Company" && (
              <Link to={`/application/${job._id}`} className="bg-blue mb-4 px-4 py-2 text-white rounded hover:bg-bl">Apply Now</Link>
            )}
            <p className="text-center text-gray-600">Apply for the job and hear back from the hiring manager in the shortest time possible!</p>
          </div>
          <div className="right-sec bg-white rounded-lg shadow p-6 mb-8 md:flex-1 shadow-xl">
  <h2 className="text-2xl font-semibold mb-4 text-center">{job.title}</h2>
  <div className="flex justify-center">
    <div className="border w-1/2"></div>
  </div>
            <div className="country flex items-center mb-4 mt-2">
              <FaGlobe className="mr-2" />
              <p className="font-semibold">{job.country}</p>
            </div>
            <div className="city flex items-center mb-4">
              <FaCity className="mr-2" />
              <p className="font-semibold">{job.city}</p>
            </div>
            <div className="location flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2" />
              <p className="font-semibold">{job.location}</p>
            </div>
            <div className="salary flex items-center mb-4">
              <FaMoneyBillWave className="mr-2" />
              <p className="font-semibold">
                {job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`}
              </p>
            </div>
            <div className="post-time flex items-center mb-4">
              <FaClock className="mr-2" />
              <p className="font-semibold">Posted On: <span>{formatDate(job.jobPostedOn)}</span></p>
            </div>
            <div className="border-blue-50"></div>
            
            <div className="description mb-8 sr-only md:not-sr-only">
              <h3 className="text-lg font-semibold mb-2">Job Description:</h3>
              <p>{job.description}</p>
            </div>
            <div className="description mb-8 sr-only md:not-sr-only">
              <h3 className="text-lg font-semibold mb-2">Job Responsibility:</h3>
              <p>{job.jobResponsibility}</p>
            </div>
            <div className="description mb-8 sr-only md:not-sr-only">
              <h3 className="text-lg font-semibold mb-2">Experiences:</h3>
              <p>{job.experiences}</p>
            </div>
            <div className="skills">
              <h3 className="text-lg font-semibold mb-2">Skills Required</h3>
              <ul className="list-disc pl-5">
                {job.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
   

    </section>
  );
};

export default JobDetails;
