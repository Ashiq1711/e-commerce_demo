import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContex";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const { products, backendUrl, token, delivery_fee, currency } =
    useContext(ShopContext);
  const [order, setOrder] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allorderItems = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethord"] = order.paymentMethord;
            item["date"] = order.date;
            allorderItems.push(item);
          });
        });
        setOrder(allorderItems.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-3">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="">
        {order.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-500">
                  <p>{currency} {item.quantity}</p>
                  <p>Quentity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p>
                  Date : <span>{new Date(item.date).toDateString()}</span>
                </p>
                <p>
                  Payment : <span>{item.paymentMethord}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <p className=" h-2 w-2 rounded-full bg-green-500"></p>
                <p>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="btn btn-outline">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
