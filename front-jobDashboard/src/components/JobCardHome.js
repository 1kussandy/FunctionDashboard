// JobCardHome.js
import React from 'react';
import '../styles/JobCard.css';

function JobCardHome({ job }) {
    
    return (
        <div className="JobCard">
          <div className="JobCardContent">
            <h2>{job.title}</h2><br/>
            <p>{job.Roles}</p><br/>
            <p>{job.location}</p>  <br/>
            <a href={job.website} target="_blank" rel="noopener noreferrer">
              <button>Apply</button>
            </a>
          </div>
        </div>
      );
    }

export default JobCardHome;
