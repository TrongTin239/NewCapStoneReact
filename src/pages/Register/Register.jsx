import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupApi } from "../../redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const { messRegister } = useSelector((state) => state.userReducer);
  console.log(messRegister);
  const dispatch = useDispatch();

  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  const frm = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      gender: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("This field cannot be blank!")
        .email("Invalid email!"),
      password: Yup.string()
        .required("This field cannot be blank!")
        .min(3, "Password must be having 3-10 characters!")
        .max(10, "Password must be having 3-10 characters!"),
      passwordConfirm: Yup.string()
        .required("This field cannot be blank!")
        .oneOf([Yup.ref("password"), null], "Passwords must match!"),
      name: Yup.string().required("This field cannot be blank!"),
      phone: Yup.string()
        .required("This field cannot be blank!")
        .min(6, "Minimum 6 number!")
        .max(10, "Maximum 10 number!")
        .matches(phoneRegex, "Invalid phone number"),
      gender: Yup.string().required("Please select gender!"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const userData = {
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        gender: values.gender,
      };
      dispatch(signupApi(userData));
    },
  });
  return (
    <div className="container my-5 px-5">
      <h2>Register</h2>
      <hr />
      {messRegister ? (
        <span className="text-danger " style={{ fontSize: 30 }}>
          {messRegister.message}
        </span>
      ) : (
        ""
      )}
      <form className="row my-2" onSubmit={frm.handleSubmit}>
        <div className="col-sm-6 pe-sm-5">
          <div className="form-group">
            <p>Email</p>
            <input
              className="form-control w-100"
              id="email"
              name="email"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.email ? (
              <span className="text-danger"> {frm.errors.email}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-2">
            <p>Password</p>
            <input
              className="form-control w-100"
              type="password"
              id="password"
              name="password"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.password ? (
              <span className="text-danger"> {frm.errors.password}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-2">
            <p>Password confirm</p>
            <input
              className="form-control w-100"
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.passwordConfirm ? (
              <span className="text-danger"> {frm.errors.passwordConfirm}</span>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-sm-6 ps-sm-5">
          <div className="form-group">
            <p>Name</p>
            <input
              className="form-control w-100"
              id="name"
              name="name"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.name ? (
              <span className="text-danger"> {frm.errors.name}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-2">
            <p>Phone</p>
            <input
              className="form-control w-100"
              id="phone"
              name="phone"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.phone ? (
              <span className="text-danger"> {frm.errors.phone}</span>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-4 row align-items-center">
            <span className="col-sm-2">Gender</span>
            <div
              role="group"
              className="col-sm-10 mt-2 mt-sm-0 d-flex align-items-center"
            >
              <div className="ms-sm-4 d-flex flex-column">
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  style={{ accentColor: "#6200EE", width: 40, height: 40 }}
                  onChange={frm.handleChange}
                />
                <label>Male</label>
              </div>
              <div className="ms-4 d-flex flex-column">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  onChange={frm.handleChange}
                  style={{ accentColor: "#6200EE", width: 40, height: 40 }}
                />
                <label>Female</label>
              </div>
              {frm.errors.gender ? (
                <span className="ms-4 text-danger"> {frm.errors.gender}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="form-group mt-4">
            <button
              className="btn rounded-pill text-white text-uppercase px-3"
              style={{ backgroundColor: "#6200EE" }}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
