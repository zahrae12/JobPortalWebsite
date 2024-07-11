import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Resume from "./Resume";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [interviewDetails, setInterviewDetails] = useState({ time: "", location: "", meetingLink: "" });
  const [selectedApplication, setSelectedApplication] = useState(null); // Separate state for selected application for interview details
  const [visibleApplicationId, setVisibleApplicationId] = useState(null); // State for toggling visibility of application details
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        if (user && user.role === "Company") {
          url = 'http://localhost:4000/api/v1/application/company/getall';
          const interviewUrl = "http://localhost:4000/api/v1/application/company/getinterviews";
          const interviewRes = await axios.get(interviewUrl, { withCredentials: true });
          setInterviews(interviewRes.data.applications);
        } else {
          url = "http://localhost:4000/api/v1/application/student/getall";
        }
        const res = await axios.get(url, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    if (isAuthorized) {
      fetchData();
    } else {
      navigateTo("/login");
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prev) =>
        prev.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitFeedback = async (id, feedback, interviewDetails) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/v1/application/submit-feedback/${id}`,
        { companyFeedback: feedback, interviewDetails },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      const updatedApplications = applications.map(application =>
        application._id === id ? { ...application, companyFeedback: feedback, interviewDetails } : application
      );
      setApplications(updatedApplications);
      if (feedback === 'interview') {
        toast.success('Interview details sent to the student successfully!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInterviewDetailsChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitFeedback = (id, feedback) => {
    if (feedback === "interview") {
      setSelectedApplication(id); // Set the selected application for interview details
    } else {
      submitFeedback(id, feedback, null);
    }
  };

  const handleSubmitInterview = () => {
    const { time, location, meetingLink } = interviewDetails;
    if (!time) {
      toast.error("Please enter the interview time.");
      return;
    }
    if (!location && !meetingLink) {
      toast.error("Please enter either a location or a meeting link.");
      return;
    }
    if (location && meetingLink) {
      toast.error("Please enter only one: location or meeting link.");
      return;
    }
    submitFeedback(selectedApplication, "interview", interviewDetails);
    setSelectedApplication(null); // Reset the selected application
    setInterviewDetails({ time: "", location: "", meetingLink: "" }); // Reset interview details
  };

  return (
    <section className="my-applications container mx-auto p-4 ">
      <h1 className="text-2xl font-semibold text-center mb-4 mt-4">
        {user && user.role === "Student"
          ? "My Applications"
          : "Applications From Students"}
      </h1>
      {applications.length === 0 ? (
        <h4 className="text-center">No Applications Found</h4>
      ) : (
        applications.map((element) => (
          <ApplicationCard
            key={element._id}
            element={element}
            userRole={user.role}
            deleteApplication={deleteApplication}
            openModal={openModal}
            handleSubmitFeedback={handleSubmitFeedback}
            isVisible={visibleApplicationId === element._id} // Pass visibility state
            toggleVisibility={() => setVisibleApplicationId(
              visibleApplicationId === element._id ? null : element._id
            )} // Add toggle visibility function
          />
        ))
      )}

      {modalOpen && <Resume imageUrl={resumeImageUrl} onClose={closeModal} />}
      {selectedApplication && user.role === "Company" && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Enter Interview Details</h2>
            <label className="block mb-2">
              Time:
              <input
                type="datetime-local"
                name="time"
                value={interviewDetails.time}
                onChange={handleInterviewDetailsChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block mb-2">
              Location:
              <input
                type="text"
                name="location"
                value={interviewDetails.location}
                onChange={handleInterviewDetailsChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                disabled={!!interviewDetails.meetingLink}
              />
            </label>
            <label className="block mb-2">
              Meeting Link:
              <input
                type="text"
                name="meetingLink"
                value={interviewDetails.meetingLink}
                onChange={handleInterviewDetailsChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                disabled={!!interviewDetails.location}
              />
            </label>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleSubmitInterview}
              >
                Submit
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setSelectedApplication(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const ApplicationCard = ({
  element,
  userRole,
  deleteApplication,
  openModal,
  handleSubmitFeedback,
  isVisible, // Receive visibility state
  toggleVisibility, // Receive toggle function
}) => (
  <div className="  bg-slate-100 shadow-md rounded-lg p-6 mb-4">
    <div className="flex items-center mb-4">
      <img src={element.companyLogo} className="h-12 w-12 mr-4" alt="" />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{element.jobTitle}</h3>
        <p className="text-gray-500">{element.company}</p>
      </div>
      {userRole === "Student" && (
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteApplication(element._id)}
        >
          Delete
        </button>
      )}
      {userRole === "Company" && (
        <div className="flex space-x-4">
        <button
          className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSubmitFeedback(element._id, "interview")}
          disabled={element.companyFeedback === "interview" || element.companyFeedback === "reject"}
        >
          Interview
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSubmitFeedback(element._id, "reject")}
          disabled={element.companyFeedback === "interview" || element.companyFeedback === "reject"}
        >
          Reject
        </button>
      </div>

      )}
      <button onClick={toggleVisibility} className="ml-4 text-blue hover:text-blue-700">
        {isVisible ? "Hide Details" : "Show Details"}
      </button>
    </div>
    {isVisible && (
      <>
        {userRole === "Student" && (
          <>
            <p className="mb-4"><strong>Cover Letter:</strong> {element.coverLetter}</p>
            <div className="resume-container w-full md:w-1/2 border-l">
              <img
                className="cursor-pointer mb-4"
                src={element.resume.url}
                alt="Resume"
                onClick={() => openModal(element.resume.url)}
              />
            </div>
          </>
        )}
        {userRole === "Company" && (
          <>
            <p className="mb-4"><strong>Name:</strong> {element.name}</p>
            <p className="mb-4"><strong>Email:</strong> {element.email}</p>
            <p className="mb-4"><strong>Address:</strong> {element.address}</p>
            <p className="mb-4"><strong>Date Of Birth:</strong> {element.dateOfBirth}</p>
            <p className="mb-4"><strong>Gender:</strong> {element.gender}</p>
            <p className="mb-4"><strong>Phone:</strong> {element.phone}</p>
            <p className="mb-4"><strong>Date Of Application:</strong> {element.dateOfApplication}</p>
            <p className="mb-4"><strong>Cover Letter:</strong> {element.coverLetter}</p>
            <div className="resume-container w-full md:w-1/2 border-l">
              <img
                className="cursor-pointer mb-4"
                src={element.resume.url}
                alt="Resume"
                onClick={() => openModal(element.resume.url)}
              />
            </div>
            
           
          </>
        )}
      </>
    )}
    {element.companyFeedback === "interview" && (
      <div className="mt-4">
       <div className=" border-gray p-2">
        <p><strong>Interview Time:</strong> {new Date(element.interviewDetails.time).toLocaleString()}</p>
        {element.interviewDetails.location ? (
          <p><strong>Location:</strong> {element.interviewDetails.location}</p>
        ) : (
          <p><strong>Meeting Link:</strong> <a href={element.interviewDetails.meetingLink} target="_blank" rel="noopener noreferrer">{element.interviewDetails.meetingLink}</a></p>
        )}
      </div>
      </div>
    )}
    {/* show the reject */}
    {element.companyFeedback === "reject" && (
      <div className="mt-4">
       <div className="border-gray p-2">
       <p>Application rejected</p>
      </div>
      </div>
    )}
  </div>
);

export default MyApplications;
