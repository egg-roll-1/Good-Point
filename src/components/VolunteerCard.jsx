import React from 'react';
import './VolunteerCard.css';

const VolunteerCard = ({ region, title, people, recruitDate, volunteerDate }) => {
  return (
    <div className="volunteer-card">
      <div className="badge-row">
        <span className="badge">재난</span>
        <span className="badge">재해</span>
        <span className="badge">{region}</span>
      </div>
      <p className="title">{title}</p>
      <p className="detail">모집인원: {people}</p>
      <p className="detail">모집기간: {recruitDate}</p>
      <p className="detail">봉사기간: {volunteerDate}</p>
    </div>
  );
};

export default VolunteerCard;
