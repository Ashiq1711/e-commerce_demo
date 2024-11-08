import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContex";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState();
  const [size, setSize] = useState("");

  const [image, setImage] = useState();

  const ferchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    ferchProductData();
  }, [productId, products]);
  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product dara */}
      <div className="felx gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* product image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[10%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[42%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
          {/* product information */}
          <div className="flex-1">
            <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_icon} alt="" />
              <img src={assets.star_dull_icon} alt="" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-5 font-medium text-3xl">
              {currency}
              {productData.price}
            </p>
            <p className="mt-4 text-gray-600 md:w-4/5">
              {productData.description}
            </p>
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${
                      item === size ? "border-orange-500" : ""
                    }`}
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="btn btn-outline"
            >
              Add to cart
            </button>
            <hr className="mt-8 sm:w-4/5" />
            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1"></div>
            <p className="text-gray-500">100% original prosuct</p>
            <p className="text-gray-500">
              Cash on delivery is available on this product.
            </p>
            <p className="text-gray-500">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      {/* sescription */}
      <div className="mt-20">
        <div className="flex  ">
          <b className="px-4 py-2 border ">Description</b>
          <p className="px-4 py-2 border">Review (122)</p>
        </div>
        <hr className="mt-5" />
        <div className="flex flex-col gap-4 mt-6 border p-5 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/* related product  */}
      <div>
        <RelatedProducts
          category={productData.category}
          subcategory={productData.subcategory}
        />
      </div>
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};

export default Product;
