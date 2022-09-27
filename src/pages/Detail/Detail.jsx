import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import {
  getProductDetail,
  getProductToCartAction,
  quantityAction,
} from "../../redux/reducers/productReducer";

export default function Detail() {
  const navigate = useNavigate();
  const { productDetail } = useSelector((state) => state.productReducer);
  const newDetail = { ...productDetail, quantityOrder: 1 };
  const [quantity, setQuantity] = useState(newDetail.quantityOrder);
  const newProductDetail = { ...newDetail, quantityOrder: quantity };

  const params = useParams();

  const dispatch = useDispatch();
  const getProductDetailApi = () => {
    let { id } = params;

    const action = getProductDetail(id);
    dispatch(action);
  };

  useEffect(() => {
    getProductDetailApi();
    setQuantity(newDetail.quantityOrder);
  }, [params.id]);

  const renderSize = () => {
    // console.log(productDetail)
    return productDetail.size?.map((size, index) => {
      return (
        <button key={index} className="me-2">
          {size}
        </button>
      );
    });
  };
  // console.log(productDetail.relatedProducts);
  const renderRealateProduct = () => {
    return productDetail.relatedProducts?.map((prod, index) => {
      return (
        <div key={index} className="col-4 mt-5">
          <div className="card">
            <img
              className="w-50"
              src={prod.image}
              alt="..."
              style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            />
            <div className="card-body">
              <p className="h3"> {prod.name} </p>
              <p style={{ height: "50px" }}>{prod.shortDescription}</p>
            </div>
            <div className="p-2 col-button d-flex">
              <button
                className=" btn-buy  w-50 "
                onClick={() => {
                  navigate(`/detail/${prod.id}`);
                }}
              >
                Buy now
              </button>
              <button className="btn-price w-50 ">{prod.price}$</button>
            </div>
          </div>
        </div>
      );
    });
  };
  const renderDetailProduct = () => {};
  const pushToCart = () => {
    const action = getProductToCartAction(newProductDetail);
    dispatch(action);
  };
  return (
    <div className="detail ">
      <div className="container">
        <div className="main">
          <div className=" img ">
            <img className="w-100" src={productDetail.image} alt="" />
          </div>
          <div className=" ms-5 product-info  ">
            <h3 className="product-name">{productDetail.name}</h3>
            <span>{productDetail.description}</span>
            <div className="size">
              <h5>Avaiable size</h5>

              {renderSize()}
            </div>
            <div className="price">{productDetail.price}$</div>
            {/* <button className="btn btn-secondary">42</button>
          <button className="btn btn-secondary">42</button>
          <button className="btn btn-secondary">42</button>
          <button className="btn btn-secondary">42</button> */}
            <div className="amount my-3">
              <button
                className="plus"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
              <p> {quantity}</p>
              <button
                className="minus"
                onClick={() => {
                  if (quantity === 1) {
                    return 1;
                  }
                  setQuantity(quantity - 1);
                }}
              >
                -
              </button>
            </div>
            <button
              className="add-cart"
              onClick={() => {
                pushToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="product">
          <h1> Related Product</h1>
          <div className="row">{renderRealateProduct()}</div>
        </div>
      </div>
    </div>
  );
}
