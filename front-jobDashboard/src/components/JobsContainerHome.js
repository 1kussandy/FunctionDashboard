// JobsContainerHome.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCardHome from './JobCardHome';
import '../styles/JobCard.css';

function JobsContainerHome() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs from the /jobs endpoint
    axios.get('http://localhost:3000/jobs')
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {
        console.error('Error fetching jobs:', error);
      });
  }, [setJobs]);

  return (
    <div className="JobsContainer">
      {jobs.map(job => (
        <JobCardHome key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobsContainerHome;
