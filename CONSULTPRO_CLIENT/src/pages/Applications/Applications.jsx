import React, { useState } from "react";
import { Table, Button , Popconfirm } from "antd";
import { EyeOutlined ,} from "@ant-design/icons";
import applicationsData from "../../assets/tempdata/applicationsData";
import "./ApplicationsStyles.scss";

const Applications = () => {
  const [applications, setApplications] = useState(applicationsData);

  const handleApprove = (id) => {
    alert(`Request approved for ID: ${id}`);
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };

  const handleReject = (id) => {
    alert(`Request rejected for ID: ${id}`);
    setApplications(
      applications.filter((application) => application.id !== id)
    );
  };



  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Profile Image",
      dataIndex: "profileImg",
      key: "profileImg",
      render: (text) => (
        <Button
          icon={
            <EyeOutlined
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: text ? "inherit" : "gray",
                cursor: text ? "pointer" : "not-allowed",
              }}
            />
          }
          onClick={() => text && window.open(text, "_blank")}
          disabled={!text}
        />
      ),
    },
    {
      title: "NIC",
      dataIndex: "nic",
      key: "nic",
      render: (text) => (
        <Button
          icon={
            <EyeOutlined
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: text ? "inherit" : "gray",
                cursor: text ? "pointer" : "not-allowed",
              }}
            />
          }
          onClick={() => text && window.open(text, "_blank")}
          disabled={!text}
        />
      ),
    },
    {
      title: "Degree Transcript",
      dataIndex: "degreeTranscript",
      key: "degreeTranscript",
      render: (text) => (
        <Button
          icon={
            <EyeOutlined
              style={{
                fontSize: "20px",
                color: text ? "inherit" : "gray",
                cursor: text ? "pointer" : "not-allowed",
              }}
            />
          }
          onClick={() => text && window.open(text, "_blank")}
          disabled={!text}
        />
      ),
    },
    {
      title: "Signature",
      dataIndex: "signature",
      key: "signature",
      render: (text) => (
        <Button
          icon={
            <EyeOutlined
              style={{
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: text ? "inherit" : "gray",
                cursor: text ? "pointer" : "not-allowed",
              }}
            />
          }
          onClick={() => text && window.open(text, "_blank")}
          disabled={!text}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Popconfirm
            title={
              <>
                Are you sure to approve this application? <br />
                And Send Account Setup Email
              </>
            }
            onConfirm={() => handleApprove(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Approve</Button>
          </Popconfirm>
          <Popconfirm
            title="Are you sure to reject this application?"
            onConfirm={() => handleReject(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button>Reject</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="applications-container">
      <h1>Counselor Applications</h1>
      <Table
        className="custom-table"
        dataSource={applications}
        columns={columns}
        rowKey="id"
        pagination={false}
        scroll={{ x: 2000 }}
      />
    </div>
  );
};

export default Applications;
