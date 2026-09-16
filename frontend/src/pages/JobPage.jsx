import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

    const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        mehtod: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch job");
        }
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this");
    if (!confirm) return;
    deleteJob(jobId);
    navigate("/");
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company.name}</p>
      <p>Contact Email: {job.company.contactEmail}</p>
      <p>Contact Phone: {job.company.contactPhone}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted Date: {job.postedDate}</p>
      <Link to={`/edit-job/${id}`}>
        <button>Edit Job</button>
      </Link>
      <button onClick= {()=> onDeleteClick(job._id)}>Delete</button>
    </div>
  );
}

export default JobPage;
