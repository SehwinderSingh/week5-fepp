import {useEffect, useState} from "react";
import JobListing from "../components/JobListing";

const JobsByTypePage = () => {
    const[type,setType] = useState("Full-time");
    const[jobs,setJobs] = useState([]);
    const[loading,setLoading] = useState(false);
    const[error,setError]= useState(null);

    useEffect(() => {
        const fetchJobsByType = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch (`/api/jobs/type/${encodeURIComponent(type)}`)
                if (!res.ok)throw new Error("Failed to fetch jobs");
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                setError(error.message);
                setJobs([]);
            }finally{
                setLoading(false);
            }
        };

        fetchJobsByType();

    }, [type]);

      return (
    <div className="home">
      <h2>Jobs by Type</h2>

      <label htmlFor="job-type">Select type: </label>
      <select
        id="job-type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="job-list">
          {jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            jobs.map((job) => <JobListing key={job.id} {...job} />)
          )}
        </div>
      )}
    </div>
  );

};

export default JobsByTypePage;
