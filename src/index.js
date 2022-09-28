import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Routes, Route } from "react-router-dom";
import { store } from "./redux/configStore";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Profile from "./pages/Profile/Profile";
import Index from "./pages/Index/Index";
import "./assets/scss/style.scss";
import Detail from "./pages/Detail/Detail";
import Search from "./pages/Search/Search";
import Carts from "./pages/Carts/Carts";
export const history = createBrowserHistory({ window });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<App />}>
          <Route index path="" element={<Index />}></Route>
          <Route path="/detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
          <Route path="/search" element={<Search />} />

          <Route path="/carts" element={<Carts />} />

          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
