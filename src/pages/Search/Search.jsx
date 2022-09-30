import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { getProduct } from "../../redux/reducers/productReducer";

export default function Search() {
  const timeoutRef = useRef({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { arrProduct } = useSelector((state) => state.productReducer);
  // console.log(arrProduct);
  const [searchParams, setSearchParams] = useSearchParams();
  let keysearchRef = useRef("");
  const handleChange = (e) => {
    keysearchRef.current = e.target.value;
    timeoutRef.current = setTimeout(() => {
      setSearchParams({ keysearch: keysearchRef.current });
    }, 1000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getProductByKey = async () => {
    let keyword = searchParams.get("keysearch");
    if (!keyword) {
      const action = getProduct(arrProduct);
      dispatch(action);
    }
    try {
      let result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product?keyword=" + keyword,
        method: "get",
      });
      // console.log(result.data.content);
      const action = getProduct(result.data.content);
      clearTimeout(timeoutRef.current);
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProductByKey();
  }, [keysearchRef.current]);

  const renderSearchProduct = () => {
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
            <div className="card-body">
              <p className="h3"> {prod.name} </p>
              <p style={{ height: "50px" }}>{prod.shortDescription}</p>
            </div>
            <div className=" p-2 col-button d-flex">
              <button
                className="btn-buy w-50 "
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
  return (
    <div className="container mb-5">
      <p>Search</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product name" onChange={handleChange} />
        <button className=""> Search</button>
      </form>
      <div className="mt-5">
        <h2>Search result</h2>
        <div className="row d-flex flex-column">
          <p>Price</p>
          <div className="col-3 d-flex justify-content-between ">
            Decrease
            <div className="icon pe-3">
            <i className="fa-solid fa-angle-down"></i>
            </div>
          </div>
          <div className="col-3  mt-3">Ascending</div>
        </div>
        <div className="row mt-5">{renderSearchProduct()}</div>
      </div>
    </div>
  );
}
