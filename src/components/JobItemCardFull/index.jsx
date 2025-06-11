import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css'
import Header from '../Header';

const JobItemCardFull = () => {
  const { id } = useParams();
  const [job,setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
      const data = await response.json();
      const { job_details, similar_jobs } = data;
      const formattedJob = {
        id: job_details.id,
        companyLogo: job_details.company_logo_url,
        company: job_details.company_website_url,
        title: job_details.title,
        rating: job_details.rating,
        location: job_details.location,
        employmentType: job_details.employment_type,
        salary: job_details.package_per_annum,
        companyWebsite: job_details.company_website_url,
        description: job_details.job_description,
        skills: job_details.skills.map((skill) => ({
          name: skill.name,
          logo: skill.image_url,
        })),
        lifeAtCompany: {
          description: job_details.life_at_company.description,
          imageUrl: job_details.life_at_company.image_url,
        },
        similarJobs: similar_jobs.map((j) => ({
          id: j.id,
          companyLogo: j.company_logo_url,
          company: j.title,
          title: j.title,
          rating: j.rating,
          description: j.job_description,
          location: j.location,
          employmentType: j.employment_type,
        })),
      };
      setJob(formattedJob);
    }
    };
    fetchJobDetails();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <>
    <Header/>
    <div className="jobdetails-container">
      {/* Header */}
    <div className="jobdetailsmain">
      <div className="jobheader">
    <div className="jobheader-top">
    <img src={job.companyLogo} alt={job.company} className="company-logo" />
    <div>
      <h2>{job.title}</h2>
      <div className="jobrating"><span>★</span> {job.rating}</div>
    </div>
  </div>
  <div className="jobinfo">
    <span>{job.location}</span>
    <span>{job.employmentType}</span>
    <span>{job.salary}</span>
  </div>
  <hr />
  
</div>

      {/* Description */}
      <div className="jobsection">
        <div className='jobsectionlink'>
          <h3>Description</h3>
          <a href={job.companyWebsite} className="visit-link" target="_blank" rel="noopener noreferrer">
            Visit
          </a>
        </div>
        
        <p>{job.description}</p>
      </div>

      {/* Skills */}
      <div className="jobsection">
        <h3>Skills</h3>
        <div className="skills-list">
          {job.skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <img src={skill.logo} alt={skill.name} className="skill-logo" />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Life at Company */}
      <div className="job-section life-at-company">
        <h3>Life at Company</h3>
        <div className="life-content">
          <p>{job.lifeAtCompany.description}</p>
          <img
            src={job.lifeAtCompany.imageUrl}
            alt="Life at company"
            className="life-image"
          />
        </div>
      </div>
    </div>
      {/* Similar Jobs */}
      <div className="job-section">
        <h3>Similar Jobs</h3>
        <div className="similar-jobs-list">
          {job.similarJobs.map((similarJob) => (
            <div key={similarJob.id} className="similar-job-card">
              <img
                src={similarJob.companyLogo}
                alt={similarJob.company}
                className="company-logo"
              />
              <h4>{similarJob.title}</h4>
              <div className="job-rating">
                <span>★</span> {similarJob.rating}
              </div>
              <p>{similarJob.description}</p>
              <div className="job-info">
                <span>{similarJob.location}</span>
                <span>{similarJob.employmentType}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default JobItemCardFull;