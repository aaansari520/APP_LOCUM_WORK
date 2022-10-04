import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../assets/wrappers/RegisterPage";
import FormRow from "../../components/FormRow";
import Logo from "../../components/Logo";
import { loginUser, registerUser } from "../../features/user/userSlice";
import useDidMountEffect from "./useDidMountEffect";
// import { validate } from "../../features/validations/validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  key: false,
};

const Register = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { user, isloading } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log("sttate", state);
    setFormErrors(validate(state));
    console.log("formErrors....", formErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const Check = validate(state);
    // console.log("checkk", Check);
    // setFormErrors(Check);
    setState({ ...state, key: true });

    console.log("Object.keys(formErrors)", Object.keys(formErrors));
    if (Object.keys(formErrors).length === 0) {
      if (state.isMember) {
        return dispatch(
          loginUser({ email: state.email, password: state.password })
        );
      } else {
        return dispatch(
          registerUser({
            name: state.name,
            email: state.email,
            password: state.password,
          })
        );
      }
    }
  };

  const toggleMember = () => {
    setState({ ...state, isMember: !state.isMember });
  };
  useEffect(() => {
    const isValid = validate(state);
    console.log("isValid", isValid);
    setFormErrors(isValid);
    // setState({ ...state, key: true });
  }, [state]);

  const validate = (values) => {
    const { isMember } = state;
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (isMember) {
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This Email is not a valid one!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      } else if (values.password.length > 6) {
        errors.password = "Password limit exceeded";
      }
    } else {
      if (!values.name) {
        errors.name = "Name is required!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (!regex.test(values.email)) {
        errors.email = "This Email is not a valid one!";
      }
      if (!values.password) {
        errors.password = "Password is required!";
      } else if (values.password.length > 6) {
        errors.password = "Password limit exceeded";
      }
    }
    return errors;
  };

  console.log("Form Errors", formErrors);
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form">
        {/* <img src={logo} alt="" className="logo" /> */}
        <Logo />
        <h3>{state.isMember ? "LOGIN" : "REGISTER"}</h3>
        {!state.isMember && (
          <div>
            <FormRow
              type="text"
              name="name"
              value={state.name}
              handleChange={handleChange}
              formErrors={formErrors}
              state={state}
              setState={setState}
            />
          </div>
        )}
        <FormRow
          type="email"
          name="email"
          value={state.email}
          handleChange={handleChange}
          formErrors={formErrors}
          state={state}
          setState={setState}
        />
        {/* <p style={{ color: "red" }}>{formErrors.email}</p> */}
        {/* <p style={{ color: "red" }}>{!state.email ? formErrors.email : ""}</p> */}
        {/* <p style={{ color: "red" }}>
          {state.email && !regex.test(state.email)
            ? formErrors.email
            : !state.email
            ? formErrors.email
            : ""}
        </p> */}
        {/* {state.email && <p style={{ color: "red" }}></p>} */}
        {/* {state.email && !regex.test(state.email) ? return( <p style={{ color: "red" }}>
            {!state.email
              ? formErrors.email
              : !regex.test(state.email)
              ? formErrors.email
              : ""}
          </p>)
        : (
          ""
        )} */}
        <div>
          <FormRow
            type="password"
            name="password"
            value={state.password}
            handleChange={handleChange}
            formErrors={formErrors}
            state={state}
            setState={setState}
          />
          {/* <p style={{ color: "red" }}> */}
          {/* {state.password.length < 6
            ? formErrors.password
            : state.password.length > 6
            ? formErrors.password
            : ""} */}
          {/* {formErrors.password} */}
          {/* </p> */}
        </div>
        <button
          type="submit"
          className="btn btn-block"
          onClick={handleSubmit}
          disabled={isloading}
        >
          {isloading ? "Loading..." : "Submit"}
        </button>
        <p>
          {/* Already A Member */}
          {state.isMember ? "Not a member ? " : "Already a member ? "}
          <button type="button" onClick={toggleMember} className="member-btn">
            {state.isMember ? " Register" : " Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
//  <p style={{ color: "red" }}>
{
  /* {!state.name ? formErrors.name : ""} */
}
//  {formErrors.name}
//  </p>;

// if (!values.position) {
//   errors.position = "This field is required!";
// }
// if (!values.company) {
//   errors.company = "This field is required!";
// }
// if (!values.jobLocation) {
//   errors.jobLocation = "This field is required!";
// }
