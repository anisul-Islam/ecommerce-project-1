import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";

import {
  fetchAllOrdersForAdmin,
  updateOrderStatus,
} from "../../services/ProductService";
import ProductList from "../../components/ProductList";
import AdminSidebar from "../../components/AdminSidebar";

export const AdminOrder = () => {
  const { userData: adminData, token } = useSelector(
    (state) => state.user.data
  );

  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const [changedStatus, setChangedStatus] = useState("");
  console.log(changedStatus);
  useEffect(() => {
    if (token) getOrders();
  }, []);

  const getOrders = async () => {
    try {
      console.log("get orders is called");
      const response = await fetchAllOrdersForAdmin(token);
      console.log(response);
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatusChange = async (event, id) => {
    try {
      setChangedStatus(event.target.value);
      await updateOrderStatus(id, event.target.value, token);
      await getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {adminData ? (
        <div className="container-full">
          <AdminSidebar adminData={adminData} />
          <div className="main-content">
            <h2>Welcome {adminData.name}</h2>
            <p>All the Orders are here</p>

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
                        <th scope="col">Change order Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order.status}</td>

                        <td>
                          <select
                            name="status"
                            value={changedStatus}
                            defaultValue={changedStatus}
                            onChange={(event) => {
                              handleStatusChange(event, order._id);
                            }}
                          >
                            {status.map((s, i) => (
                              <option key={i} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>{order.buyer.name}</td>
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
