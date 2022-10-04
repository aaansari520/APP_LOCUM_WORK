import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const Modal1 = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    });
  }, []);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      navigate("/home");
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    navigate("/home");
  };

  return (
    <>
      <Modal
        open={open}
        title="Login"
        // onOk={handleOk}
        onCancel={handleCancel}
        // footer={[
        //   // <Button key="back" onClick={handleCancel}>
        //   //   Return
        //   // </Button>,
        //   <Button
        //     key="submit"
        //     type="primary"
        //     loading={loading}
        //     onClick={handleOk}
        //   >
        //     Submit
        //   </Button>,
        // ]}
        footer=""
      >
        <Login handleOk={handleOk} loading={loading} />
      </Modal>
    </>
  );
};

export default Modal1;
