import React, { useEffect, useRef, useState } from "react";
import { Input, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUser, searchBased } from "../../Redux/userSlice";

const PatientTable = () => {
  const { userData, isLoading, totalPages, total } = useSelector(
    (state) => state.user
  );
  const [searchedText, setSearchedText] = useState(null);
  const [page1, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (totalPages !== null) {
      setPageSize(totalPages);
    }
  }, [totalPages]);

  console.log("Total Pagesss", totalPages);
  console.log(" Pagesss", page1);
  const gettingPage = (page) => {
    setPage(page);
    console.log("Value change horahi hai kya page ki", page);
  };
  const firstUpdate = useRef(true);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("stop");
      if (firstUpdate.current) {
        firstUpdate.current = false;
      } else {
        if (searchedText) {
          dispatch(getUser({ searchedText, page1 }));
        }
      }
      if (!searchedText) {
        dispatch(searchBased());
      }
    }, 2000);

    return () => clearTimeout(delaySearch);
  }, [searchedText, page1]);

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
          String(record.patient_profile.gender)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.online).toLowerCase().includes(value.toLowerCase())
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
      dataIndex: "online",
      render: (online) => {
        const color = online ? "Green" : "Red";
        return <Tag color={color}> {online ? "Yes" : "No"}</Tag>;
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
        // value={searchedText}
        onChange={(e) => {
          const change = e.target.value;
          setSearchedText(change);
        }}
      ></Input.Search>

      {searchedText ? (
        <Table
          loading={isLoading}
          dataSource={userData}
          columns={columns}
          pagination={{
            total: total,
            onChange: (pag) => {
              gettingPage(pag);
              console.log("pag", pag);
            },
          }}
          rowKey="id"
        ></Table>
      ) : (
        ""
      )}
    </div>
  );
};

export default PatientTable;
