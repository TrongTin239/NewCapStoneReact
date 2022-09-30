import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, loginFbApi } from "../../redux/reducers/userReducer";
import FacebookLogin from "react-facebook-login";
export default function Login() {
  const { messLogin } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const responseFacebook = (response) => {
    console.log(typeof response.accessToken);
    dispatch(loginFbApi(response.accessToken));
  };
  const frm = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Required!").email("Invalid email!"),
      password: Yup.string()
        .required("Required!")
        .min(3, "Password must be having 3-10 characters!")
        .max(10, "Password must be having 3-10 characters!"),
    }),
    onSubmit: (values, action) => {
      dispatch(loginApi(values));

      action.resetForm({ values: "" });
    },
  });
  return (
    <div className="">
      <form className="container my-5 px-5" onSubmit={frm.handleSubmit}>
        <h2>Login</h2>
        <hr />
        <div className="lg-w-50 m-auto">
          {messLogin ? (
            <span className="text-danger " style={{ fontSize: 24 }}>
              {messLogin.message}
            </span>
          ) : (
            ""
          )}
          <div className="form-group">
            <p>Email</p>
            <input
              className="form-control"
              id="email"
              name="email"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.email}
            />
            {frm.errors.email ? (
              <span className="text-danger">{frm.errors.email}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-4">
            <p>Password</p>
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
              value={frm.values.password}
            />
            {frm.errors.password ? (
              <span className="text-danger">{frm.errors.password}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-4 d-flex justify-content-between align-items-center">
            <NavLink
              className="nav-link text-primary fw-bold mx-auto"
              to="/register"
            >
              Register now?
            </NavLink>
            <div className=""></div>
            <button
              className="btn text-uppercase text-white rounded-pill"
              style={{ backgroundColor: "#6200EE" }}
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="form-group mt-4">
            {/* <button
              className="w-100 py-2 rounded d-flex justify-content-center align-items-center btn btn-primary text-white"
              style={{ border: "none" }}
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="me-3"
                style={{ fontSize: 30 }}
              />
              <span>Continue with Facebook</span>
            </button> */}
            <FacebookLogin
              data-width="100%"
              appId="651475096325476"
              autoLoad={false}
              fields="name,email,picture"
              // onClick={(props) => {
              //   return <div> Continue with Facebook</div>;
              // }}
              callback={responseFacebook}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
