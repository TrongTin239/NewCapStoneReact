import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction, logout } from "../redux/reducers/userReducer";
import { ACCESS_TOKEN, USER_LOGIN } from "../utils/tools";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.userReducer);
  const { carts } = useSelector((state) => state.productReducer);
  const temp = carts.productOrder.length;
  const [volumn, setVolumn] = useState(temp);
  useEffect(() => {
    setVolumn(temp);
  }, [temp]);
  // console.log(carts.productOrder.length);
  const checkLogin = () => {
    if (userLogin) {
      return navigate("/carts");
    } else {
      alert("đăng nhâp để vào giỏ hàng");
      return navigate("/login");
    }
  };

  const renderLoginNavItem = () => {
    if (!userLogin) {
      return (
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      );
    }
    return (
      <li className="d-flex">
        <div className="nav-item">
          <NavLink className="nav-link" to="/profile">
            Hello <span className="text-uppercase">{userLogin.name}</span> !
          </NavLink>
        </div>
        <div className="nav-item logout">
          <NavLink
            className=" nav-link"
            to="/"
            onClick={() => {
              localStorage.removeItem(ACCESS_TOKEN);
              localStorage.removeItem(USER_LOGIN);
              dispatch(getProfileAction());
            }}
          >
            Log out
          </NavLink>
        </div>
      </li>
    );
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-sm navbar-dark bg-black">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src="./img/image 3.png" alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          />
          <div className="collapse navbar-collapse" id="collapsibleNavId">
      

            <div className=" ms-auto d-flex align-items-center">
              <img
                className=" mx-1"
                src="./img/search.png"
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/search`);
                }}
              />
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/search`);
                }}
                className="text-light"
              >
                Search
              </span>
            </div>

            <ul className="navbar-nav mt-2 mt-lg-0">
              <li className="nav-item">
                <div className="nav-link">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    onClick={() => {
                      checkLogin();
                    }}
                  />
                  <span className="">({volumn})</span>
                </div>
              </li>
              {renderLoginNavItem()}

              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="#">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Men
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Women
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Kid
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="#">
                  Sport
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
