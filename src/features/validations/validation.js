const validate = (values) => {
  const errors = {};
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
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
  } else if (values.password.length < 6) {
    errors.password = "Password must of 6 characters";
  } else if (values.password.length > 6) {
    errors.password = "Password must of 6 characters";
  }
  if (!values.position) {
    errors.position = "This field is required!";
  }
  if (!values.company) {
    errors.company = "This field is required!";
  }
  if (!values.jobLocation) {
    errors.jobLocation = "This field is required!";
  }
  return errors;
};
