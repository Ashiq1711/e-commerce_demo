import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Order = ({ token }) => {
  const [order, setOrder] = useState([]);

  const featchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrder(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
const statusHandler=async(event,orderId)=>{
  try {
    const response= await axios.post(backendUrl+ "/api/order/status",{orderId,status:event.target.value},{headers:{token}})
if (response.data.success) {
  await featchAllOrders()
}
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}
  useEffect(() => {
    featchAllOrders();
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {order.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 md:p-8 my-3 p-5 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>

       
       <div>
        {order.items.map((item,index)=>{
          if (index=== order.items.length-1) {
            return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
          }else{
            
            return <p className="py-0.5" key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
          }
        })
        }
       </div>
       <p className="mt-2 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
       <div>
        <p>{order.address.street}</p>
        <p>{order.address.city}, {order.address.state}, {order.address.country},{order.address.zipcode}</p>
       <p>{order.address.phone}</p>
       </div>
          </div>
          <div>
            <p className="font-bold">Items : {order.items.length}</p>
            <p className="mt-3">Methors : {order.paymentMethord}</p>
            <p>Payment : {order.pament ? "Paid" : "Unpaid"}</p>
            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div>

          <p className="font-bold">{currency}{order.amount}</p>
          </div>
          <div>

          <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="Order Placed">Order Placed</option>
            <option value="Packaging">Packaging</option>
            <option value="Shipped"> Shipped</option>
            <option value="Out for delivery"> Out For Delivery</option>
            <option value="Delivered">  Delivered</option>
          </select>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
