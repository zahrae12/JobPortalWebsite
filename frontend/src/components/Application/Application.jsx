import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";

const Application = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null); // State to hold job details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true, // Include credentials for authentication
        });
        setJobDetails(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        // Handle error appropriately
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("gender", gender);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume("");
      setDateOfBirth("");
      setGender("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Company")) {
    navigateTo("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo">
    {jobDetails && (
      <div className="container max-w-6xl bg-white shadow-lg rounded-lg flex overflow-hidden border-rounded-s-lg mt-4">
        <div className="w-full mt-4 p-8">
          <h2 className="text-3xl font-bold  text-center">{jobDetails.title}</h2>
          <div className="flex items-center justify-center mb-4">
            <p className="mr-4 text-center font-semibold"> {jobDetails.company}</p>
            <img
              src={jobDetails.companyLogo}
              alt="logo"
              className="h-16 rounded-full sm:mx-0 sm:shrink-0"
            />
          </div>
          <form onSubmit={handleApplication} className="space-y-4 bg-white/0">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  placeholder="Your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700">Gender</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-300 rounded"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Cover Letter</label>
              <textarea
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                placeholder="Your Cover Letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700">Resume</label>
              <input
                type="file"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue text-white py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Send Application
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default Application;
