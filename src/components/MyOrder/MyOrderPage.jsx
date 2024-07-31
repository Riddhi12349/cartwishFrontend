import React from "react";
import "./MyOrderPage.css";
import Table from "./../Table/Table";
import useData from "../../hooks/useData";
import Loader from "../Table/Loader";

const MyOrderPage = () => {
  const {
    data: orders,
    error,
    isLoading,
  } = useData("/order", null, ["myorders"], 1 * 60 * 1000);

  const getProductString = (order) => {
    const productStingArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );
    return productStingArr.join(", ");
  };
  return (
    <section className="align_center my_order_page">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <Loader />}
      {orders && (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{getProductString(order)}</td>
                <td>${order.total}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </section>
  );
};
export default MyOrderPage;
