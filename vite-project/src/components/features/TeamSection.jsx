/**
 * TeamSection Component
 *
 * Renders the leadership and designer team showcase grid.
 */

import React from "react";
import { teamMembers } from "../../data/teamData";

export function TeamSection() {
  return (
    <div className="untree_co-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-5 mx-auto text-center">
            <h2 className="section-title">Our Team</h2>
          </div>
        </div>

        <div className="row">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0"
            >
              <img
                src={member.img}
                className="img-fluid mb-5 rounded"
                alt={member.name}
              />
              <h3>
                <a href="#team" className="text-decoration-none text-dark">
                  {member.name}
                </a>
              </h3>
              <span className="d-block position mb-4 text-muted">
                {member.position}
              </span>
              <p>{member.bio}</p>
              <p className="mb-0">
                <a href="#learn-more" className="more dark">
                  Learn More <span className="icon-arrow_forward"></span>
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamSection;

