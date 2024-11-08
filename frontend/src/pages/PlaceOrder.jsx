import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContex";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    backendUrl,
    navigate,
    setCartItem,
    token,
    cartItem,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  // const handlepayment=()=>{
  //   // navigate('/order')
  //   axios.get(backendUrl+"/api/payment/init")
  //   .then((data)=>{
  //     console.log(data)
  //     window.location.replace(`https://sandbox.sslcommerz.com/EasyCheckOut/${data.data}`)
  //   }).catch((error)=>{
  //     console.log(error)
  //   })
  // }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    street: "",
    zipcode: "",
    country: "",
  });
  const onchagrHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
switch (method) {
  case "cod":
    const response=  await axios.post(backendUrl+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      setCartItem({});
      toast.success(response.data.message);
      navigate("/order");
    } else {  
      toast.error(response.data.message);
    }
    break;
    default:
    break;
}

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side  */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"BELIVERY"} text2={"INFORMAION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchagrHandler}
            name="firstName"
            value={formData.firstName}
            className="border px-4 rounded-md w-full border-gray-500 py-3"
            placeholder="First name"
            type="text"
          />
          <input
            required
            onChange={onchagrHandler}
            name="lastName"
            value={formData.lastName}
            className="border px-4 rounded-md w-full border-gray-500 py-3"
            placeholder="Last name"
            type="text"
          />
        </div>
        <div>
          <input
            required
            onChange={onchagrHandler}
            name="email"
            value={formData.email}
            className="border w-full px-4 rounded-md border-gray-500 py-3"
            placeholder="Email address"
            type="email"
          />
        </div>
        <div>
          <input
            required
            onChange={onchagrHandler}
            name="street"
            value={formData.street}
            className="border w-full px-4 rounded-md border-gray-500 py-3"
            placeholder="Street"
            type="text"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchagrHandler}
            name="city"
            value={formData.city}
            className="border px-4 rounded-md w-full border-gray-500 py-3"
            placeholder="City"
            type="text"
          />
          <input
            required
            onChange={onchagrHandler}
            name="state"
            value={formData.state}
            className="border px-4 rounded-md w-full border-gray-500 py-3"
            placeholder="State"
            type="text"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onchagrHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border px-4 rounded-md w-full border-gray-500 py-3"
            placeholder="Zip code"
            type="number"
          />
          <input
            required
            onChange={onchagrHandler}
            name="country"
            value={formData.country}
            className="border px-4 rounded-md w-full border-gray-500 py-3"
            placeholder="Country"
            type="text"
          />
        </div>
        <div>
          <input
            onChange={onchagrHandler}
            name="phone"
            value={formData.phone}
            className="border w-full px-4 rounded-md border-gray-500 py-3"
            placeholder="Phone"
            type="number"
          />
        </div>
      </div>

      {/* right side  */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="text-[18px] mt-10">
          <Title text1={"PAYMENT"} text2={"METHORD"} />
          <div className="flex flex-col lg:flex-row gap-3 ">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2  px-3  cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className=" font-bold text-sky-500">SSLCommerzPayment</p>
            </div>
            {/* <div onClick={()=>setMethod('rezarpay')} className="flex items-center gap-3 border p-2  px-3 cursor-pointer">
  <p className={`min-w-3.5 h-3.5 border rounded-full ${method=== "rezarpay"? "bg-green-400" : ""}`}></p>
  <img className="h-5 " src={assets.razorpay_logo} alt="" />
</div> */}
            <div
              onClick={() => setMethod("cod")}
              className=" flex items-center gap-3 border p-2 px-3  cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium  ">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button type="submit" className="btn btn-neutral px-8">
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
