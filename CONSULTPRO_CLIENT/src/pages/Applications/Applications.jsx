import React, { useState } from "react";
import "./ApplicationsStyles.scss";
import applicationsData from "../../assets/tempdata/applicationsData";

const Applications = () => {
  const [applications, setApplications] = useState(applicationsData);

  const handleApprove = (id) => {
    // Approve request logic
    alert(`Request approved for ID: ${id}`);
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

  const handleReject = (id) => {
    // Reject request logic
    alert(`Request rejected for ID: ${id}`);
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

  return (
    <>
      <div className="applications-container">
        <h1>Counselor Applications</h1>
        <div className="applications-list">
          {applications.map((application) => (
            <div key={application.id} className="application-card">
              <h2>
                {application.firstName} {application.lastName}
              </h2>
              <div className="application-details">
                <div>
                  <strong>Username:</strong> {application.username}
                </div>
                <div>
                  <strong>Age:</strong> {application.age}
                </div>
                <div>
                  <strong>Address:</strong> {application.address}
                </div>
                <div>
                  <strong>City:</strong> {application.city}
                </div>
                <div>
                  <strong>District:</strong> {application.district}
                </div>
                <div>
                  <strong>Specialization:</strong> {application.specialization}
                </div>
                <div>
                  <strong>Contact:</strong> {application.contact}
                </div>
                <div>
                  <strong>Is Psychiatrist:</strong>{" "}
                  {application.isPsychiatrist ? "Yes" : "No"}
                </div>
                {application.isPsychiatrist && (
                  <div>
                    <strong>Medical Qualification:</strong>{" "}
                    <button
                      className="view-button"
                      onClick={() => {
                        const newWindow = window.open(
                          "",
                          "_blank",
                          "width=800,height=600"
                        );
                        newWindow.document.write(`
                <html>
                  <head>
                    <title>NIC Document</title>
                  </head>
                  <body>
                    <embed src="${application.medicalQualification}" width="auto" height="90%" />
                  </body>
                </html>
              `);
                      }}
                    >
                      View
                    </button>
                  </div>
                )}
                <div>
                  <strong>Profile Image:</strong>{" "}
                  <button
                      className="view-button"
                      onClick={() => {
                        const newWindow = window.open(
                          "",
                          "_blank",
                          "width=800,height=600"
                        );
                        newWindow.document.write(`
                <html>
                  <head>
                    <title>NIC Document</title>
                  </head>
                  <body>
                    <embed src="${application.profileImg}" width="auto" height="90%" />
                  </body>
                </html>
              `);
                      }}
                    >
                      View
                    </button>
                </div>
                <div>
                  {/* <strong>NIC:</strong>{" "} */}
                  {/* <a
                    href={`${application.nic}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View */}
                  <div>
                    <strong>NIC:</strong>{" "}
                    <button
                      className="view-button"
                      onClick={() => {
                        const newWindow = window.open(
                          "",
                          "_blank",
                          "width=800,height=600"
                        );
                        newWindow.document.write(`
                <html>
                  <head>
                    <title>NIC Document</title>
                  </head>
                  <body>
                    <embed src="${application.nic}" width="auto" height="90%" />
                  </body>
                </html>
              `);
                      }}
                    >
                      View
                    </button>
                  </div>
                  {/* </a> */}
                </div>
                <div>
                  <strong>Degree Transcript:</strong>{" "}
                  <button
                      className="view-button"
                      onClick={() => {
                        const newWindow = window.open(
                          "",
                          "_blank",
                          "width=800,height=600"
                        );
                        newWindow.document.write(`
                <html>
                  <head>
                    <title>NIC Document</title>
                  </head>
                  <body>
                    <embed src="${application.degreeTranscript}" width="auto" height="90%" />
                  </body>
                </html>
              `);
                      }}
                    >
                      View
                    </button>
                </div>
                <div>
                  <strong>Signature:</strong>{" "}
                  <button
                      className="view-button"
                      onClick={() => {
                        const newWindow = window.open(
                          "",
                          "_blank",
                          "width=800,height=600"
                        );
                        newWindow.document.write(`
                <html>
                  <head>
                    <title>NIC Document</title>
                  </head>
                  <body>
                    <embed src="${application.signature}" width="auto" height="90%" />
                  </body>
                </html>
              `);
                      }}
                    >
                      View
                    </button>
                </div>

                <div className="experience-container">
                  <strong>Experience:</strong>
                  <textarea value={application.experience} readOnly />
                </div>
              </div>
              <div className="actions">
                <button onClick={() => handleApprove(application.id)}>
                  Approve
                </button>
                <button onClick={() => handleReject(application.id)}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Applications;
