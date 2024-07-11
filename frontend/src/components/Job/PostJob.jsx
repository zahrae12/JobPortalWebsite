import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [salaryType, setSalaryType] = useState("default");
  const [company, setCompany] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [jobResponsibility, setResponsibility] = useState("");
  const [experiences, setExperiences] = useState("");

  const { isAuthorized, user } = useContext(Context);

  const handleJobPost = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios
      .post(
        "http://localhost:4000/api/v1/job/postjob",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              country,
              city,
              requirements,
              location,
              fixedSalary,
              company,
              companyLogo,
              jobResponsibility,
              experiences,
            }
          : {
              title,
              description,
              category,
              country,
              city,
              location,
              requirements,
              salaryFrom,
              salaryTo,
              company,
              companyLogo,
              jobResponsibility,
              experiences,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigateTo("/");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Company")) {
    navigateTo("/");
  }

  return (
    <div className="job_post page p-6 rounded-lg bg-white shadow-md">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold mt-4 text-center mb-4">POST NEW JOB</h3>
        <form onSubmit={handleJobPost} className="grid gap-6">
          <div className="flex gap-6">
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Job Title"
            />
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
            />
          </div>
          <div className="flex gap-6">
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="url"
              value={companyLogo}
              onChange={(e) => setCompanyLogo(e.target.value)}
              placeholder="Company Logo URL (e.g., https://example.com/logo.png)"
              required
            />
            <select
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Graphics & Design">Graphics & Design</option>
              <option value="Mobile App Development">Mobile App Development</option>
              <option value="Frontend Web Development">Frontend Web Development</option>
              <option value="MERN Stack Development">MERN STACK Development</option>
              <option value="Account & Finance">Account & Finance</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
              <option value="Video Animation">Video Animation</option>
              <option value="MEAN Stack Development">MEAN STACK Development</option>
              <option value="MEVN Stack Development">MEVN STACK Development</option>
              <option value="Data Entry Operator">Data Entry Operator</option>
            </select>
          </div>
          <div className="flex gap-6">
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
            />
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </div>
          <div className="flex gap-6">
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Required Skills"
            />
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={jobResponsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              placeholder="Job Responsibility"
            />
          </div>
          <div className="flex gap-6">
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={experiences}
              onChange={(e) => setExperiences(e.target.value)}
              placeholder="Required Experience"
            />
            <input
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="flex gap-6">
            <select
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
            {salaryType === "default" ? (
              <p className="w-full px-4 py-2">Please provide Salary Type *</p>
            ) : salaryType === "Fixed Salary" ? (
              <input
                className="w-full px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                type="number"
                placeholder="Enter Fixed Salary"
                value={fixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
              />
            ) : (
              <div className="flex gap-6 w-full">
                <input
                  className="w-1/2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  type="number"
                  placeholder="Salary From"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                />
                <input
                  className="w-1/2 px-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  type="number"
                  placeholder="Salary To"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                />
              </div>
            )}
          </div>
          <textarea
            className="w-full px-4 py-2 mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Job Description"
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
