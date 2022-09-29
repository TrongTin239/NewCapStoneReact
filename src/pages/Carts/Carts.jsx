import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAction,
  getProductToCartAction,
  decreaseCart,
  clearCartsAction,
} from "../../redux/reducers/productReducer";

export default function Carts() {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.productReducer);
  const { userLogin } = useSelector((state) => state.userReducer);
  const email = userLogin.email;
  const arr = [];
  let quantity = carts.productOrder?.map((item) => {
    return item.quantityOrder;
  });
  useEffect(() => {
    renderCarts();
  }, [quantity, carts]);
  const handleDecreaseCart = (id) => {
    dispatch(decreaseCart(id));
  };
  const renderCarts = () => {
    return carts.productOrder?.map((prod, index) => {
      return (
        <tr key={index} className="">
          <td className="text">{prod.id}</td>
          <td>
            <img
              className="shoes"
              src={prod.image}
              alt=".."
              width={100}
              height={100}
            />
          </td>
          <td className="text"> {prod.name}</td>
          <td className="text">{prod.price}$</td>
          <td className="">
            <button
              className="btn btn-primary plus-minus p-1"
              onClick={() => {
                const action = getProductToCartAction(prod);
                dispatch(action);
              }}
            >
              +
            </button>
            <span className=" quantity shoes-img px-2 mx-1">
              {prod.quantityOrder}
            </span>
            <button
              className="btn btn-primary plus-minus p-1"
              onClick={() => {
                if (prod.quantityOrder > 1) {
                  handleDecreaseCart(prod);
                } else if (prod.quantityOrder === 1) {
                  return 1;
                }
              }}
            >
              -
            </button>
          </td>
          <td className="text">{prod.price * `${prod.quantityOrder}`}$</td>
          <td className="action">
            <button className="btn edit me-2 text">Edit</button>
            <button
              className="btn btn-danger text"
              onClick={() => {
                deleteProduct(prod.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  const clearCarts = () => {
    dispatch(clearCartsAction(arr));
  };
  const submitOrder = async () => {
    let productOrder = JSON.parse(localStorage.getItem("orderProduct"));
    if (!productOrder || productOrder.length === 0) {
      return alert("Vui lòng chọn sản phẩm bạn muốn đặt hàng");
    }
    let orderDetail = [...productOrder];
    const replace = {
      id: "productId",
      quantityOrder: "quantity",
    };
    let res = orderDetail.map((object) => {
      for (const key in replace) {
        if (object[key]) {
          object[replace[key]] = object[key];
          delete object[key];
        }
      }
      return object;
    });

    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/order",
        method: "post",
        data: {
          orderDetail: res,
          email: email,
        },
      });
      alert("Đặt hàng thành công");
      return result.data.content;
    } catch (err) {
      console.log(err);
    }
  };
  const deleteProduct = (id) => {
    const action = deleteProductAction(id);
    dispatch(action);
  };
  return (
    <div className="container my-4">
      <h2>Carts</h2>

      <table className="table">
        <thead className="">
          <tr>
            <th className="text">id</th>
            <th className="text">img</th>
            <th className="text">name</th>
            <th className="text">price</th>
            <th className="text px-3">quantity</th>
            <th className="text">total</th>
            <th className="text">action</th>
          </tr>
        </thead>
        <tbody>{renderCarts()}</tbody>
      </table>
      <form
        action=""
        style={{ textAlign: "right" }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <button
          className="btn btn-warning "
          onClick={() => {
            submitOrder();
            setTimeout(() => {
              clearCarts();
            }, 2000);
            localStorage.removeItem("orderProduct");
          }}
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}
