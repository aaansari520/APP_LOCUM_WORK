import { Table } from "antd";
import React from "react";
import { connect } from "react-redux";
import Modal2 from "../../validations/Modal2";

const Profile = ({ data }) => {
  const column = [
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  return (
    <>
      {data.length === 0 ? (
        <Modal2 />
      ) : (
        <div>
          <Table dataSource={data} columns={column} pagination={false}></Table>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (store) => {
  return {
    data: store.profile,
  };
};

export default connect(mapStateToProps)(Profile);
