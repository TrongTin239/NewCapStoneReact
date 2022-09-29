import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getProfileApi,
  updateProfileApi,
} from "../../redux/reducers/userReducer";
import OrderHistory from "./OrderHistory";
import ProductFavorite from "./ProductFavorite";
import * as Yup from "yup";

export default function Profile() {
  const { userLogin } = useSelector((state) => state.userReducer);
  console.log(userLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileApi());
  }, []);

  const frm = useFormik({
    initialValues: {
      email: userLogin?.email || "",
      password: "",
      name: userLogin?.name || "",
      phone: userLogin?.phone || "",
      gender: userLogin?.gender || "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      phone: Yup.string(),
      password: Yup.string()
        .min(3, "Password must be having 3-10 characters!")
        .max(10, "Password must be having 3-10 characters!"),
      gender: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      const data = {};
      for (let key in values) {
        data[key] = values[key] ? values[key] : userLogin[key];
      }
      console.log(data);
      dispatch(updateProfileApi(data));
    },
  });
  return (
    <div className="container my-5">
      <h4
        className="col-12 col-sm-6 px-4 py-2 text-white"
        style={{
          background: "linear-gradient(180deg, #F21299 0%, #1B02B5 100%",
        }}
      >
        Profile
      </h4>

      <form className="my-5 row" onSubmit={frm.handleSubmit}>
        <div className="form-group col-12 col-sm-3">
          <img
            className="avatar-img rounded-circle"
            src={userLogin?.avatar}
            alt="avatar"
          />
        </div>
        <div className="row col-12 col-sm-9">
          <div className="col-sm-6">
            <div className="form-group">
              <p>Email</p>
              <input
                className="form-control w-100"
                id="email"
                name="name"
                placeholder={userLogin?.email}
                disabled
              />
            </div>
            <div className="form-group mt-3">
              <p>Phone</p>
              <input
                className="form-control w-100"
                id="phone"
                name="phone"
                placeholder={userLogin?.phone}
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.phone ? (
                <span className="text-danger">{frm.errors.phone}</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <p>Name</p>
              <input
                className="form-control w-100"
                id="name"
                name="name"
                placeholder={userLogin?.name}
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.name ? (
                <span className="text-danger">{frm.errors.name}</span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group mt-3">
              <p>Password</p>
              <input
                className="form-control w-100"
                id="password"
                name="password"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
              {frm.errors.password ? (
                <span className="text-danger">{frm.errors.password}</span>
              ) : (
                ""
              )}
            </div>
            <div className="form-group row mt-3">
              <span className="col-sm-2">Gender</span>
              <div
                role="group"
                className="mt-2 mt-sm-0 col-sm-10 d-flex align-items-center"
              >
                <div className="ms-4 d-flex flex-column">
                  <input
                    type="radio"
                    name="gender"
                    value="true"
                    style={{ accentColor: "#6200EE", width: 40 }}
                    defaultChecked={userLogin?.gender}
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
                    defaultChecked={!userLogin?.gender}
                    style={{ accentColor: "#6200EE", width: 40 }}
                  />
                  <label>Female</label>
                </div>
                {frm.errors.gender ? (
                  <span className="text-danger">{frm.errors.gender}</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form-group mt-3 d-flex justify-content-end">
              <button
                className="btn rounded-pill text-white px-3"
                style={{ backgroundColor: "#6200EE" }}
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
      <hr />

      {/* Order history and Favorite */}

      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link text-16 active"
            id="nav-history-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-history"
            type="button"
            role="tab"
            aria-controls="nav-history"
            aria-selected="true"
            style={{ fontWeight: 400 }}
          >
            Order History
          </button>
          <button
            className="nav-link text-16"
            id="nav-favorite-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-favorite"
            type="button"
            role="tab"
            aria-controls="nav-favorite"
            aria-selected="false"
            style={{ fontWeight: 400 }}
          >
            Favorite
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-history"
          role="tabpanel"
          aria-labelledby="nav-history-tab"
        >
          <OrderHistory userLogin={userLogin} />
        </div>
        <div
          className="tab-pane fade"
          id="nav-favorite"
          role="tabpanel"
          aria-labelledby="nav-favorite-tab"
        >
          <ProductFavorite />
        </div>
      </div>
    </div>
  );
}

<script
  src="https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.2/antd.min.js"
  integrity="sha512-ktMcWbnTz8JSq52/Y8fdaSL28qmPKIJMXQqgwkEJGge1oWZ599hssJFlA++F/PmPMPkp4aWZIgvDLp9Wt2PQZw=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>;
