import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";
import * as actionTypes from "../redux/action";

const Checkout = ({ cart, emptyCart }) => {
  const [totalPrice, setTotalPrice] = useState();
  const [totalItems, setTotalItems] = useState();
  const [checkoutInput, setCheckoutInput] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const history = useHistory();

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += parseInt(item.qty);
      price += item.qty * item.price;
    });
    console.log("InsideSIde", items);
    setTotalItems(items);
    setTotalPrice(price);
  }, [cart]);
  console.log("OutSIde", totalItems);

  // const handleInput = (e) => {
  //   e.persist();
  //   setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
  // };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstname: Yup.string().required("This field is required!"),
    lastname: Yup.string().required("This field is required!"),
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("This field is required!"),
    email: Yup.string()
      .email("invalid email !")
      .required("please enter email id."),
    address: Yup.string().required("This field is required!"),
    city: Yup.string().required("This field is required!"),
    state: Yup.string().required("This field is required!"),
    zipcode: Yup.string().required("This field is required!"),
  });

  const submitOrder = (values, { resetForm }) => {
    // e.preventDefault();

    const { firstname, lastname, phone, email, address, city, state, zipcode } =
      values;
    console.log(firstname);
    // const data = {
    //   firstname: checkoutInput.firstname,
    //   lastname: checkoutInput.lastname,
    //   phone: checkoutInput.phone,
    //   email: checkoutInput.email,
    //   address: checkoutInput.address,
    //   city: checkoutInput.city,
    //   state: checkoutInput.state,
    //   zipcode: checkoutInput.zipcode,
    //   // payment_mode: payment_mode,
    //   payment_id: "",
    // };

    const data = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      // payment_mode: payment_mode,
      payment_id: "",
    };

    console.log("CheckOut wala data", data);
    resetForm();
    emptyCart();
    history.push("/thank");
    // setCheckoutInput({
    //   firstname: "",
    //   lastname: "",
    //   phone: "",
    //   email: "",
    //   address: "",
    //   city: "",
    //   state: "",
    //   zipcode: "",
    // });
  };

  // const resetForm1 = ({ resetForm }) => {
  //   resetForm(checkoutInput);
  // };

  return (
    <Formik
      initialValues={checkoutInput}
      onSubmit={submitOrder}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleSubmit, errors, touched }) => {
        return (
          <Form>
            <div className="row">
              <div className="col-md-7">
                <div className="card">
                  <div className="card-header">
                    <h4>Basic Information</h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> First Name</label>
                          <input
                            type="text"
                            name="firstname"
                            onChange={handleChange}
                            value={values.firstname}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.firstname && errors.firstname}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Last Name</label>
                          <input
                            type="text"
                            name="lastname"
                            onChange={handleChange}
                            value={values.lastname}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.lastname && errors.lastname}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Phone Number</label>
                          <input
                            type="number"
                            name="phone"
                            onChange={handleChange}
                            value={values.phone}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.phone && errors.phone}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label> Email Address</label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={values.email}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.email && errors.email}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group mb-3">
                          <label> Full Address</label>
                          <textarea
                            rows="3"
                            name="address"
                            onChange={handleChange}
                            value={values.address}
                            className="form-control"
                          ></textarea>
                          <small className="text-danger">
                            {touched.address && errors.address}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>City</label>
                          <input
                            type="text"
                            name="city"
                            onChange={handleChange}
                            value={values.city}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.city && errors.city}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>State</label>
                          <input
                            type="text"
                            name="state"
                            onChange={handleChange}
                            value={values.state}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.state && errors.state}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group mb-3">
                          <label>Zip Code</label>
                          <input
                            type="number"
                            name="zipcode"
                            onChange={handleChange}
                            value={values.zipcode}
                            className="form-control"
                          />
                          <small className="text-danger">
                            {touched.zipcode && errors.zipcode}
                          </small>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group text-end">
                          {/* <Link
                            to="/thank"
                            className="btn btn-primary mx-1"
                            onClick={handleSubmit}
                          >
                            <button
                            // type="button"
                            // className="btn btn-primary mx-1"
                            // onClick={() => handleSubmit(values)}
                            ></button>
                            Place Order
                          </Link> */}

                          <button
                            type="button"
                            className="btn btn-primary mx-1"
                            onClick={() => handleSubmit(values)}
                          >
                            Place Order
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary mx-1"
                            // onClick={(e) => submitOrder(e, "razorpay")}
                          >
                            Pay by Razorpay
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning mx-1"
                            // onClick={(e) => submitOrder(e, "payonline")}
                          >
                            Pay Online
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th width="50%">Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{item.title}</td>
                          <td>{item.price}</td>
                          <td>{item.qty}</td>
                          <td>{item.price * item.qty}</td>
                        </tr>
                      );
                    })}

                    <tr>
                      <td colSpan="2" className="text-end fw-bold">
                        Grand Total
                      </td>
                      <td colSpan="2" className="text-end fw-bold">
                        {totalPrice}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (store) => {
  return {
    cart: store.cart,
  };
  // return <div>Checkout</div>;
};

const mapDispatchToProps = (dispatch) => {
  console.log("Dispatch", dispatch);

  return {
    emptyCart: () => dispatch({ type: actionTypes.EMPTY_CART }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
// export default Checkout;
