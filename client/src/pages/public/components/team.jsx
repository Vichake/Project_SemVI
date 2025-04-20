import React from 'react';
import Harsh from '../../../assets/images/sell.jpg';
import Vishavas from '../../../assets/images/sell.jpg';
import Sujal from '../../../assets/images/sell.jpg';
import Dhruv from '../../../assets/images/sell.jpg';

const teamMembers = [
  {
    name: "Harsh Ambre",
    role: "Head of Operations",
    image: Harsh
  },
  {
    name: "Vishavas Ichake",
    role: "Head of Operations",
    image: Vishavas
  },
  {
    name: "Sujal Patil",
    role: "Head of Operations",
    image: Sujal
  },
  {
    name: "Dhruv Raval",
    role: "Head of Operations",
    image: Dhruv
  }
];

function TeamSection() {
  return (
    <section className="team" id="team">
      <h2>Meet Our Team</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="member" key={index}>
            <img src={member.image} alt={`Photo of ${member.name}`} />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
