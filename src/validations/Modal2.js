import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const Modal2 = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    });
  }, []);

  const handleOk = () => {
    // setTimeout(() => {

    setOpen(false);
    navigate("/");
    // }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    navigate("/home");
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Oops! Please Login First!"
        open={open}
        okText="Login"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>After login you will gate amazing ui experience</p>
      </Modal>
    </>
  );
};

export default Modal2;
