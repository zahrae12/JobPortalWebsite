import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCheck, FaAngleDown } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetching All jobs of a Company
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/v1/job/myjobs", { withCredentials: true });
        setMyJobs(data.myjobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || user.role !== "Company") {
    navigateTo("/");
  }

  // Function for enabling editing
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function for disabling editing
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function to toggle expanded job details
  const toggleExpandedJob = (jobId) => {
    setExpandedJobId((prevId) => (prevId === jobId ? null : jobId));
  };

  // Function for editing job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios.put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
      withCredentials: true,
    }).then((res) => {
      toast.success(res.data.message);
      setEditingMode(null);
    }).catch((error) => {
      toast.error(error.res.data.message);
    });
  };

  // Delete job
  const handleJobDelete = async (jobId) => {
    await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, { withCredentials: true }).then((res) => {
      toast.success(res.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    }).catch((error) => {
      toast.error(error.response.data.message);
    });
  };

  // Handle input change
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) => {
      return prevJobs.map((job) => {
        if (job._id === jobId) {
          return { ...job, [field]: value };
        }
        return job;
      });
    });
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h3 className='font-semibold'>Your Posted Jobs</h3>
        {myJobs && myJobs.length > 0 ? (
          <div className="bannerr font-Roboto">
            {myJobs.map((element) => (
              <div className='card font-Roboto' key={element._id}>
                <div className="job-header" onClick={() => toggleExpandedJob(element._id)}>
                  <img src={element.companyLogo} alt="Company Logo" className="company-logo w-18 h-14" />
                  <span className="job-title">{element.title}</span>
                  <FaAngleDown className={`expand-icon ${expandedJobId === element._id ? 'expanded' : ''}`} />
                </div>
                {expandedJobId === element._id && (
                  <>
                    <div className="content">
                      <div className="short_field">
                        <div>
                          <span>Title: </span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) => handleInputChange(element._id, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <span>Company Name: </span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.company}
                            onChange={(e) => handleInputChange(element._id, 'company', e.target.value)}
                          />
                        </div>
                        <div>
                          <span>Country: </span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) => handleInputChange(element._id, 'country', e.target.value)}
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) => handleInputChange(element._id, 'city', e.target.value)}
                          />
                        </div>
                        <div>
                          <span>Location:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.location}
                            onChange={(e) => handleInputChange(element._id, 'location', e.target.value)}
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) => handleInputChange(element._id, 'category', e.target.value)}
                            disabled={editingMode !== element._id}
                          >
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
                        <div>
                          <span>
                            Salary:
                            {element.fixedSalary ? (
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.fixedSalary}
                                onChange={(e) => handleInputChange(element._id, 'fixedSalary', e.target.value)}
                              />
                            ) : (
                              <div>
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.salaryFrom}
                                  onChange={(e) => handleInputChange(element._id, 'salaryFrom', e.target.value)}
                                />
                                -
                                <input
                                  type="number"
                                  disabled={editingMode !== element._id}
                                  value={element.salaryTo}
                                  onChange={(e) => handleInputChange(element._id, 'salaryTo', e.target.value)}
                                />
                              </div>
                            )}
                          </span>
                        </div>
                        <div>
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) => handleInputChange(element._id, 'expired', e.target.value)}
                            disabled={editingMode !== element._id}
                          >
                            <option value={true}>TRUE</option>
                            <option value={false}>FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field font-Roboto">
                        <div>
                          <span>Description</span>
                          <textarea
                            rows="5"
                            value={element.description}
                            onChange={(e) => handleInputChange(element._id, 'description', e.target.value)}
                            disabled={editingMode !== element._id}
                          />
                        </div>
                        <div>
                          <span>Requirements:</span>
                          <textarea
                            rows="5"
                            value={element.requirements}
                            onChange={(e) => handleInputChange(element._id, 'requirements', e.target.value)}
                            disabled={editingMode !== element._id}
                          />
                        </div>
                       
                        <div>
                          <span>Job Responsibility:</span>
                          <textarea
                            rows="5"
                            value={element.requirements}
                            onChange={(e) => handleInputChange(element._id, 'job responsibility', e.target.value)}
                            disabled={editingMode !== element._id}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="button_wrapper">
                      <div className="edit_btn_wrapper">
                        {editingMode === element._id ? (
                          <>
                            <button onClick={() => handleUpdateJob(element._id)} className='check_btn'><FaCheck /></button>
                            <button onClick={handleDisableEdit} className='cross_btn'><RxCross2 /></button>
                          </>
                        ) : (
                          <button onClick={() => handleEnableEdit(element._id)} className='edit_btn'>Edit</button>
                        )}
                      </div>
                      <button onClick={() => handleJobDelete(element._id)} className='delete_btn'>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>You've not posted any job or maybe you deleted all of your Posts!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;