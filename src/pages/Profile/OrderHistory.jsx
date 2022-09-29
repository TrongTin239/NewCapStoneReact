import React from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";

export default function OrderHistory() {
  const { userLogin } = useSelector((state) => state.userReducer);
  return (
    <div className="my-5">
      {userLogin?.ordersHistory.map((item) => {
        return (
          <div key={item.id}>
            <p
              style={{
                color: "#90159b",
              }}
            >
              + Orders have been placed on {dateFormat(item.date, "mm-dd-yyyy")}
            </p>
            <table className="table w-100">
              <thead style={{ backgroundColor: "#D9D9D9" }}>
                <tr>
                  <th className="responsive-text">id</th>
                  <th className="responsive-text">img</th>
                  <th className="responsive-text">name</th>
                  <th className="responsive-text">price</th>
                  <th className="responsive-text">quantity</th>
                  <th className="responsive-text">total</th>
                </tr>
              </thead>
              <tbody>
                {item.orderDetail.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td className="responsive-text">{product.id}</td>
                      <td>
                        <img
                          className="shoes-img"
                          src={product.image}
                          alt="shoes"
                        />
                      </td>
                      <td className="responsive-text">{product.name}</td>
                      <td className="responsive-text">{product.price}</td>
                      <td className="responsive-text">{product.quantity}</td>
                      <td className="responsive-text">
                        {product.price * product.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
