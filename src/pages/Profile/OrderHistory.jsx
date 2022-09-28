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
            <table className="table ">
              <thead style={{ backgroundColor: "#D9D9D9" }}>
                <tr>
                  <th>id</th>
                  <th>img</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                {item.orderDetail.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{product.id}</td>
                      <td>
                        <img
                          src={product.image}
                          alt="shoes"
                          style={{ width: 85 }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price * product.quantity}</td>
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
