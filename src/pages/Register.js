// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Wrapper from "../../assets/wrappers/RegisterPage";
// import Logo from "../../components/Logo";
// import { loginUser, registerUser } from "../../features/user/userSlice";
// import FormInput from "./FormInput";

// const Register = () => {
//   const { user, isloading } = useSelector((store) => store.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//     isMember: true,
//     valid: false,
//   });

//   const handleSubmit = (e) => {
//     const { name, email, password, isMember } = values;
//     e.preventDefault();
//     if (isMember) {
//       return dispatch(loginUser({ email: email, password: password }));
//     }
//     return dispatch(registerUser({ name, email, password }));
//   };
//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   const toggleMember = () => {
//     setValues({ ...values, isMember: !values.isMember });
//   };
//   useEffect(() => {
//     if (user) {
//       setTimeout(() => {
//         navigate("/");
//       }, 3000);
//     }
//   }, [user]);

//   //   useEffect(() => {
//   //     setTimeout((values) => {
//   //       if (values.valid === "true") {
//   //         setValues({ ...values, valid: !values.valid });
//   //       }
//   //     });
//   //   }, [values.valid === "true"]);

//   //   const Check = () => {
//   //     setValues({ ...values, valid: !values.valid });
//   //     // setTimeout(() => {
//   //     //   setValues({ ...values, valid: !values.valid });
//   //     // }, 1000);
//   //   };
//   //   console.log("values", values);
//   return (
//     <Wrapper className="full-page">
//       <form className="form" onSubmit={handleSubmit}>
//         <Logo />
//         <h3>{values.isMember ? "LOGIN" : "REGISTER"}</h3>
//         {!values.isMember && (
//           <div>
//             <FormInput
//               type="text"
//               name="name"
//               placeholder="your name..."
//               errorMessage="Name should be 3-16 characters and shouldn't include any special characters!"
//               label="Name"
//               pattern="^[A-Za-z0-9]{3,16}$"
//               required={true}
//               onChange={onChange}
//             />
//             {/* {values.valid && (
//               <p style={{ color: "red" }}>{"Name Is Required"}</p>
//             )} */}
//           </div>
//         )}
//         <FormInput
//           type="email"
//           name="email"
//           placeholder="abc@gmail.com"
//           errorMessage="It should a valid email adress!"
//           label="Email"
//           required={true}
//           onChange={onChange}
//         />
//         {/* {values.valid && <p style={{ color: "red" }}>{"Email Is Required"}</p>} */}

//         <div>
//           <FormInput
//             type="password"
//             name="password"
//             placeholder="your password..."
//             errorMessage="Password should contain only 6 characters!"
//             label="Password"
//             required={true}
//             onChange={onChange}
//           />
//           {/* {values.valid && (
//             <p style={{ color: "red" }}>{"Password Is Required"}</p>
//           )} */}
//         </div>

//         {values.name || values.email == "" ? (
//           <button className="btn btn-block">Submit</button>
//         ) : (
//           <button
//             type="submit"
//             className="btn btn-block"
//             onClick={handleSubmit}
//             disabled={isloading}
//           >
//             {isloading ? "Loading..." : "Submit"}
//           </button>
//         )}
//         <p>
//           {values.isMember ? "Not a member ? " : "Already a member ? "}
//           <button type="button" onClick={toggleMember} className="member-btn">
//             {values.isMember ? " Register" : " Login"}
//           </button>
//         </p>
//       </form>
//     </Wrapper>
//   );
// };

// export default Register;
