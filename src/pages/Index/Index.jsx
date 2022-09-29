import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProduct,
  getProductApi,
  getProductFavoriteApi,
  getProductsLikeApi,
} from "../../redux/reducers/productReducer";
import setFavourite from "../../utils";
import { ACCESS_TOKEN, getStore } from "../../utils/tools";

export default function Carousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = getStore(ACCESS_TOKEN);

  const { arrProduct, productsFavorite } = useSelector(
    (state) => state.productReducer
  );

  const arrFavourite = productsFavorite.productsFavorite;
  // console.log(arrFavourite);
  // for (let i = 0; i < arrFavourite.length; i++) {
  //   console.log(arrFavourite[i].id);
  // }
  const getAllProductApi = () => {
    const action = getProductApi();
    dispatch(action);
  };
  const getFavourite = () => {
    const action = getProductFavoriteApi(accessToken);
    dispatch(action);
  };

  // useEffect
  useEffect(() => {
    getAllProductApi();
    getFavourite();
  }, []);
  const getProductsFavorite = (id) => {
    // console.log(e);
    const action = getProductsLikeApi(id);
    dispatch(action);
  };

  const renderProductCarousel = () => {
    return arrProduct?.map((prod, index) => {
      return (
        <div
          key={index}
          className={`  carousel-item  ${prod.id === 1 ? "active" : ""}`}
        >
          <img src={prod.image} className=" ps-5 w-100%" alt="..." />
          <div className="item-info">
            <h3>{prod.name}</h3>
            <p>{prod.description}</p>
            <button
              className=""
              onClick={() => {
                navigate(`/detail/${prod.id}`);
              }}
            >
              Buy now
            </button>
          </div>
        </div>
      );
    });
  };
  const renderProductFuture = () => {
    return arrProduct?.map((prod, index) => {
      return (
        <div key={index} className="col-4 mt-5">
          <div className="card">
            <img
              className="w-50"
              src={prod.image}
              alt="..."
              style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            />
            <i
              id={`iconFavourite` + index}
              className="fa-regular  fa-heart"
              onClick={() => {
                setFavourite(index);
                getProductsFavorite(prod.id);
              }}
            ></i>
            <div className="card-body">
              <p className="h3"> {prod.name} </p>
              <p >{prod.shortDescription}</p>
            </div>
            <div className="p-2 col-button d-flex">
              <NavLink
                className=" w-50 btn-buy text-center"
                to={`detail/${prod.id}`}
              >
                Buy now
              </NavLink>
              <button className=" w-50 btn-price">{prod.price}$</button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div id="carousel" className="carousel-inner">
          <div style={{ position: "relative" }}>{renderProductCarousel()}</div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Product future */}
      <div className="product-future my-5">
        <div className="container">
          <h1>Product Feature</h1>
          <div className="row">
            {
              renderProductFuture()

              // renderTest()
            }
          </div>
        </div>
      </div>
    </div>
  );
}
