import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContex";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Paginate from "../components/Paginate";
import ScrollToTop from "react-scroll-to-top";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showfilter, setShowfiter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const togglecategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubcategory = (e) => {
    if (subcategory.includes(e.target.value)) {
      setSubcategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubcategory((prev) => [...prev, e.target.value]);
    }
  };
  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subcategory.includes(item.subcategory)
      );
    }
    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProduct.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t pt-14">
       <ScrollToTop smooth />
      {/* Filter Option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowfiter(!showfilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showfilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        <div
          className={`border sm:block border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light  text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Men"}
                onChange={togglecategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Women"}
                onChange={togglecategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Kids"}
                onChange={togglecategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
        <div
          className={`border sm:block border-gray-300 pl-5 py-3 my-6 ${
            showfilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light  text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubcategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubcategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubcategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTION"} />
          {/* products sort*/}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-200 text-sm px-2"
          >
            <option value="relavent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to Heigh</option>
            <option value="high-low">Sort by: Heigh to Low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {/* <Paginate itemsPerPage={5} filterProduct={filterProduct} products={products} /> */}

          {filterProduct.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
