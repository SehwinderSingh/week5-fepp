import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const navigate = useNavigate();

  const addJob = async (newJob) => {
  try {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) {
      throw new Error("Failed to add job");
    }

    return true;
  } catch (error) {
    console.error("Error adding job:", error);
    return false;
  }
};

const submitForm = async (e) => {
  e.preventDefault();

  const newJob = {
    title,
    type,
    description,
    company: {
      name: companyName,
      contactEmail,
      contactPhone,
    },
    location,
    salary: Number(salary),
  };

  const success = await addJob(newJob);

  if (success) {
    navigate("/");
  }
};

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>
        <label htmlFor="title">Job title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="type">Job type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="" disabled>
            Select job type
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>
        <label htmlFor="description">Job Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="contactEmail">Contact Email:</label>
        <input
          id="contactEmail"
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label htmlFor="contactPhone">Contact Phone:</label>
        <input
          id="contactPhone"
          type="tel"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;

