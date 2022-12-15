import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import UserSidebar from "../../components/UserSidebar";
import { fetchOrders } from "../../services/ProductService";
import ProductList from "../../components/ProductList";

export const UserOrder = () => {
  const { userData, token } = useSelector((state) => state.user.data);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await fetchOrders(token);
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {userData ? (
        <div className="container-full">
          <UserSidebar userData={userData} />
          <div className="main-content">
            <h2>Welcome {userData.name}</h2>
            <p>Users Orders are here</p>
            {console.log(orders)}

            {orders.map((order, index) => {
              return (
                <div>
                  <table
                    style={{
                      margin: "0.5rem",
                      backgroundColor: "#3c3caa",
                      color: "white",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.status}</td>

                        <td> {moment(order.createdAt).fromNow()}</td>
                        <td>{order.payment.success ? "success" : "failed"}</td>
                        <td>{order.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <ProductList products={order.products} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

// get the Orders
