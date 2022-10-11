import React, { useState } from "react";
import { Input, Table } from "antd";
import { useSelector } from "react-redux";

const PatientTable = () => {
  const { userData, isLoading } = useSelector((state) => state.user);
  // const [patient, setPatient] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     const get = getPatientsFromLocalStorage();
  //     setPatient(get);
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const columns = [
    {
      title: "P.Id",
      dataIndex: "id",
      sorter: (record1, record2) => {
        return record1.id > record2.id;
      },
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.full_name)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.date_of_birth)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.gender).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.id).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (record1, record2) => {
        return record1.full_name > record2.full_name;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "DOB",
      dataIndex: "date_of_birth",
      // sorter: (record1, record2) => {
      //   return record1.date_of_birth > record2.date_of_birth;
      // },
    },
    {
      title: "Age",
      dataIndex: ["patient_profile", "age"],
    },
    { title: "Gender", dataIndex: ["patient_profile", "gender"] },
    {
      title: "Online",
      dataIndex: ["patient_profile", "online"],
      render: (online) => {
        return <> {online ? "Yes" : "No"}</>;
      },
    },
  ];

  return (
    <div className="Table-Design">
      <Input.Search
        className="Table-input"
        placeholder="make global search here..."
        // onSearch={(value) => {
        //   setSearchedText(value);
        // }}

        onChange={(e) => {
          setSearchedText(e.target.value);
        }}
      ></Input.Search>
      <Table
        loading={isLoading}
        dataSource={userData}
        columns={columns}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        rowKey="id"
      ></Table>
    </div>
  );
};

export default PatientTable;
