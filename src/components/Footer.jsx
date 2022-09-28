import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="ps-5 col-4 "
          style={{ borderRight: "solid 0.25px rgba(1, 1, 1, 0.2)" }}
        >
          <p className="text-uppercase fw-bold">get help</p>
          <ul>
            <li>
              <NavLink
                className="navlink-hover"
                to="/index"
                style={{ fontWeight: 500 }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                Nike
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                Adidas
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className="ps-5 col-4"
          style={{ borderRight: "solid 0.25px rgba(1, 1, 1, 0.2)" }}
        >
          <p className="text-uppercase fw-bold">support</p>
          <ul>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                Help
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/"
                style={{ fontWeight: 500 }}
              >
                Phone
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="ps-5 col-4">
          <p className="text-uppercase fw-bold">register</p>
          <ul>
            <li>
              <NavLink
                className="navlink-hover"
                to="/register"
                style={{ fontWeight: 500 }}
              >
                register
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navlink-hover"
                to="/login"
                style={{ fontWeight: 500 }}
              >
                login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="bg-light d-flex align-items-center"
        style={{ height: 74 }}
      >
        <p className="text-center m-0 w-100 ">
          @ 2022 Cybersoft All Rights Reserved | Design Theme by Truong Tan Khai
        </p>
      </div>
    </div>
  );
}
