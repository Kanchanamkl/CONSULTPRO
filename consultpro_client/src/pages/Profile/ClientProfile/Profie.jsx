import React, { useState, useEffect, useContext } from "react";
import "./ProfileStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import axios from "axios";
import { StoreContext } from "../../../StoreContext/StoreContext";
const Profile = () => {
  const { userId } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setuserInfo] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    role: "",
    mobile: "",
    email: "",
    birthday: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://142.93.215.196:8081/api/users/get-user?id=${userId}`
        );
        const userData = response.data;
        setuserInfo({
          firstName: userData.firstName,
          lastName: userData.lastName,
          country: userData.country || "",
          city: userData.city || "Colombo",
          role: userData.role || "",
          mobile: userData.mobile || "0760345876",
          email: userData.username,
          birthday: userData.birthday || "13-06-2000",
          profilePic: userData.profilePic,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handleProfileUpdate = () => {
    console.log("Profile updated", clientInfo);
    setIsEditing(false);
  };
  return (
    <div className="profile-page">
      <SectionContainer title="">
        <div className="profile-section">
          <div className="left-container">
            <div className="profile-picture-card">
              <img src={userInfo.profilePic} alt="Profile" />
              {isEditing && (
                <input
                  type="file"
                  name="profilePic"
                  onChange={(e) =>
                    setuserInfo({
                      ...userInfo,
                      profilePic: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
              )}

              <h5>
                {userInfo.firstName} {userInfo.lastName}
              </h5>
            </div>
          </div>
          <div className="right-container">
            <div className="bio-section">
              {/* {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userInfo.firstName}
                                    placeholder="First Name"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={userInfo.lastName}
                                    placeholder="Last Name"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={userInfo.country}
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={userInfo.city}
                                    placeholder="City"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="role"
                                    value={userInfo.role}
                                    placeholder="Role"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="text"
                                    name="mobile"
                                    value={userInfo.mobile}
                                    placeholder="Mobile"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    placeholder="Username"
                                    onChange={handleInputChange}
                                />
                                <input
                                    type="date"
                                    name="birthday"
                                    value={userInfo.birthday}
                                    placeholder="Birthday"
                                    onChange={handleInputChange}
                                />
                                <button onClick={handleProfileUpdate}>
                                    Save
                                </button>
                            </>
                        ) : ( */}
              <>
                <p>
                  <label style={{ marginRight: "27px" }}>First Name</label>:
                  {"   "}
                  {userInfo.firstName}
                </p>

                <p>
                  <label style={{ marginRight: "30px" }}>Last Name</label>:
                  {"   "}
                  {userInfo.lastName}
                </p>

                <p>
                  <label style={{ marginRight: "35px" }}>Username</label>:
                  {"   "}
                  {userInfo.email}
                </p>
                <p>
                  <label style={{ marginRight: "64px" }}>Mobile</label>:{"   "}
                  {userInfo.mobile}
                </p>

                <p>
                  <label style={{ marginRight: "50px" }}>Birthday</label>:
                  {"   "}
                  {userInfo.birthday}
                </p>
                <p>
                  <label style={{ marginRight: "84px" }}>Role</label>:{"   "}
                  {userInfo.role}
                </p>
                <p>
                  <label style={{ marginRight: "80px" }}>City:{"  "}</label>:{" "}
                  {userInfo.city}
                </p>

                {/* <button onClick={handleEditToggle}>
                                    Edit
                                </button> */}
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
  // return (
  //   <div className="profile-page">
  //     <SectionContainer>
  //       <div className="profile-section">
  //         <div className="left-container">
  //           <div className="profile-picture-card">
  //             <img
  //               src={`https://i.ibb.co/ypmBR9k/08.jpg`}
  //               alt="Profile"
  //             />
  //             {isEditing && (
  //               <input
  //                 type="file"
  //                 name="profilePic"
  //                 onChange={(e) =>
  //                   setClientInfo({
  //                     ...clientInfo,
  //                     profilePic: URL.createObjectURL(e.target.files[0]),
  //                   })
  //                 }
  //               />
  //             )}

  //             <h2>
  //               {clientInfo.firstName} {clientInfo.lastName}
  //             </h2>
  //           </div>
  //         </div>
  //         <div className="right-container">
  //           <div className="bio-section">
  //             {isEditing ? (
  //               <>
  //                 <input
  //                   type="text"
  //                   name="firstName"
  //                   value={clientInfo.firstName}
  //                   onChange={handleInputChange}
  //                 />
  //                 <input
  //                   type="text"
  //                   name="lastName"
  //                   value={clientInfo.lastName}
  //                   onChange={handleInputChange}
  //                 />
  //                 <input
  //                   type="text"
  //                   name="country"
  //                   value={clientInfo.country}
  //                   onChange={handleInputChange}
  //                 />
  //                 <input
  //                   type="text"
  //                   name="occupation"
  //                   value={clientInfo.occupation}
  //                   onChange={handleInputChange}
  //                 />
  //                 <input
  //                   type="text"
  //                   name="mobile"
  //                   value={clientInfo.mobile}
  //                   onChange={handleInputChange}
  //                 />
  //                 <input
  //                   type="email"
  //                   name="email"
  //                   value={clientInfo.email}
  //                   onChange={handleInputChange}
  //                 />
  //                 <input
  //                   type="date"
  //                   name="birthday"
  //                   value={clientInfo.birthday}
  //                   onChange={handleInputChange}
  //                 />
  //                 <button onClick={handleProfileUpdate}>Save</button>
  //               </>
  //             ) : (
  //               <>
  //                 <p>
  //                   <label style={{ marginRight: "27px" }}>First Name</label>:{"  "}
  //                   {clientInfo.firstName}
  //                 </p>

  //                 <p>
  //                   <label style={{ marginRight: "30px" }}>Last Name</label>:{"  "}
  //                   {clientInfo.lastName}
  //                 </p>

  //                 <p>
  //                   <label style={{ marginRight: "70px" }}>Email</label>:{"  "}
  //                   {clientInfo.email}
  //                 </p>
  //                 <p>
  //                   <label style={{ marginRight: "57px" }}>Mobile</label>:{"  "}
  //                   {clientInfo.mobile}
  //                 </p>

  //                 <p>
  //                   <label style={{ marginRight: "46px" }}>Birthday</label>:{"  "}
  //                   {clientInfo.birthday}
  //                 </p>
  //                 <p>
  //                   <label style={{ marginRight: "23px" }}>Occupation</label>:{"  "}
  //                   {clientInfo.occupation}
  //                 </p>
  //                 <p>
  //                   <label style={{ marginRight: "50px" }}>Country</label>: {"  "}
  //                   {clientInfo.country}
  //                 </p>
  //                 <p>
  //                   <label style={{ marginRight: "80px" }}>City: </label>:{" "}
  //                   {clientInfo.city}
  //                 </p>

  //                 <button onClick={handleEditToggle}>Edit</button>
  //               </>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </SectionContainer>
  //   </div>
  //   // </div>
  // );
};

export default Profile;
