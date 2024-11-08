import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setCategory("");
        setSubCategory("");
        setBestseller(false);
        setSizes([]);
        setPrice("");
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              onChange={(e) => setImage4(e.target.files[0])}
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p>Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border bg-purple-50"
          required
          placeholder="Type here"
          type="text"
        />
      </div>
      <div className="w-full ">
        <p>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border bg-purple-50"
          required
          placeholder="write description"
          type="text"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="">
          <p>Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-purple-100 rounded-md"
          >
              <option selected>Choose category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className=" ">
          <p>Product Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 bg-purple-100 rounded-md"
          >
              <option selected>Choose subcategory</option>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>
        <div className="">
          <p>Product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border bg-purple-50"
            value={price}
            required
            placeholder="Price"
            type="number"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("S")
                ? prev.filter((item) => item !== "S")
                : [...prev, "S"]
            )
          }
        >
          <p
            className={`${
              sizes.includes("S") ? " bg-pink-100" : "bg-slate-300"
            } px-2 py-1 cursor-pointer`}
          >
            S
          </p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("L")
                ? prev.filter((item) => item !== "L")
                : [...prev, "L"]
            )
          }
        >
          <p
            className={`${
              sizes.includes("L") ? " bg-pink-100" : "bg-slate-300"
            } px-2 py-1 cursor-pointer`}
          >
            L
          </p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("M")
                ? prev.filter((item) => item !== "M")
                : [...prev, "M"]
            )
          }
        >
          <p
            className={`${
              sizes.includes("M") ? " bg-pink-100" : "bg-slate-300"
            } px-2 py-1 cursor-pointer`}
          >
            M
          </p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("XL")
                ? prev.filter((item) => item !== "XL")
                : [...prev, "XL"]
            )
          }
        >
          <p
            className={`${
              sizes.includes("XL") ? " bg-pink-100" : "bg-slate-300"
            } px-2 py-1 cursor-pointer`}
          >
            XL
          </p>
        </div>
        <div
          onClick={() =>
            setSizes((prev) =>
              prev.includes("XXL")
                ? prev.filter((item) => item !== "XXL")
                : [...prev, "XXL"]
            )
          }
        >
          <p
            className={`${
              sizes.includes("XXL") ? " bg-pink-100" : "bg-slate-300"
            } px-2 py-1 cursor-pointer`}
          >
            XXL
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className=" cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>
      <button
        type="submit"
        class="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
