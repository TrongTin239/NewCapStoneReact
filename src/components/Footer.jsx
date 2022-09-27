import React from "react";

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
              <a href="#" style={{ fontWeight: 500 }}>
                Home
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                Nike
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                Adidas
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                Contact
              </a>
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
              <a href="#" style={{ fontWeight: 500 }}>
                About
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                Contact
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                Help
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                Phone
              </a>
            </li>
          </ul>
        </div>
        <div className="ps-5 col-4">
          <p className="text-uppercase fw-bold">register</p>
          <ul>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                register
              </a>
            </li>
            <li>
              <a href="#" style={{ fontWeight: 500 }}>
                login
              </a>
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
