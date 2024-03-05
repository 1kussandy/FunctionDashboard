import React from 'react';
import JobCard from './JobCard';
import '../styles/JobCard.css';

import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function JobsContainer() {
  const location = useLocation();
  const { state } = location;
  const searchResults = state ? state.searchResults : [];
  const jobCount = searchResults.length;

  return (
    <div className="JobsContainer">
      <div className="JobCount">
        {jobCount > 0 ? `${jobCount} jobs found` : 'No results found. '}
        {jobCount === 0 && (
          <Link to="/">
            <button className="SearchAgainButton">Search again</button>
          </Link>
        )}
      </div>
      {jobCount > 0 ? (
        searchResults.map(job => (
          <JobCard key={job.id} job={job} />
        ))
      ) : (
        <div className="JobCard">
          <div className="JobCardContent">
            <div>No results found. </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsContainer;


