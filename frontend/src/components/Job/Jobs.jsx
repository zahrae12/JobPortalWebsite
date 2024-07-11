import React, { useContext, useEffect, useState } from "react";
import Newsletter from "./Newsletter";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import SideBar from "../SideBar/SideBar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [salary, setSalary] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearchChange = (e, field) => {
    if (field === 'location') {
      setLocation(e.target.value);
    } else {
      setSearchQuery(e.target.value);
    }
  };

  const handleLocationChange = (selectedLocation) => {
    setLocation(selectedLocation);
  };

  const handleSalaryChange = (selectedSalary) => {
    setSalary(selectedSalary);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/job/getall?query=${searchQuery}&location=${location}&salary=${salary}&category=${category}`, {
        withCredentials: true,
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error("Error searching jobs:", error);
    }
  };

  if (!isAuthorized) {
    navigateTo("/login");
  }

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, jobs.length);
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(jobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const { startIndex, endIndex } = calculatePageRange();
  const currentPageJobs = jobs.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchJobsBySearch = async () => {
      try {
        let url = "http://localhost:4000/api/v1/job/getall";
        const queryParams = `?query=${searchQuery}&location=${location}&salary=${salary}&category=${category}`;
        if (searchQuery || location || salary || category) {
          url += queryParams;
        }
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobsBySearch();
  }, [searchQuery, location, salary, category]);

  return (
    <section className="">
      <div className="mx-auto px-4 md:px-6">
        <h3 className="text-3xl font-semibold mb-6 text-center mt-10">Search For JOBS</h3>
        <form onSubmit={handleSearchSubmit}>
          <div className="mb-4 flex items-center">
            <div className="flex md:rounded-s-md rounded shadow-sm border-md border-2 border-rmadi md:w-1/2 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e, 'query')}
                placeholder="Search jobs..."
                className="block flex-1  border-gray bg-transparent py-1.5 pl-8 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
              <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
            </div>
            <div className="flex md:rounded-s-none rounded shadow-sm border- border-2 border-rmadi md:w-1/2 w-full">
              <input
                type="text"
                value={location}
                onChange={(e) => handleSearchChange(e, 'location')}
                className="block flex-1 border-gray-300 bg-transparent py-1.5 pl-8 text-gray-900 placeholder-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                placeholder="Location"
              />
              <FiMapPin className="absolute mt-2.5 ml-2 text-gray-400" />
            </div>
            <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md bg-blue">Search</button>
          </div>
        </form>
        <div className="flex flex-col md:flex-row justify-center md:justify-between w-full p-4 border-solid border-2 border-rmadi rounded-md mx-auto mt-10">
          <div className="md:w-1/4">
            <SideBar handleLocationChange={handleLocationChange} handleSalaryChange={handleSalaryChange} handleCategoryChange={handleCategoryChange} />
          </div>
          <div className="w-3/5 p-4 ">
            {jobs.length === 0 ? (
              <p>No job found!</p>
            ) : (
              currentPageJobs.map((job) => (
                <div
                  key={job._id}
                  className=" shadow rounded-md p-4 mb-4 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <img src={job.companyLogo} alt={job.title} className="w-14 h-14 mb-2" />
                  <p className="flex-items-center gap-2 font-semibold">{job.title}</p>
                  <div className="flex items-center gap-2">
                    <span>{job.category}</span>
                    <BiCategory />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{job.location}</span>
                    <FiMapPin />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{job.description}</span>
                  </div>
                  <Link
                    to={`/job/${job._id}`}
                    className="text-blue-500 hover:text-blue-700 text-blue"
                  >
                    View Details
                  </Link>
                </div>
              ))
            )}

            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {Math.ceil(jobs.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(jobs.length / itemsPerPage)}
                className="hover:underline"
              >
                Next
              </button>
            </div>
          </div>
          <div className="md:w-1/4 pl-4 mt-10">
            <Newsletter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
