import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import ProductItem from "./ProductItem";

const Paginate = ({ itemsPerPage, products, filterProduct }) => {
  const items = products;

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
              price={item.price}
            />
          ))}
      </>
    );
  }

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <Items currentItems={currentItems} />
      <div className="flex items-center justify-between">
        <ReactPaginate
          breakLabel="..."
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=""
          renderOnZeroPageCount={null}
          activeClassName="bg-black text-white"
          pageClassName="px-3 py-2 border border-black"
          containerClassName="flex gap-3 items-center "
        />
        <p>
          Product from {itemOffset + 1} to {endOffset} of {products.length}
        </p>
      </div>
    </>
  );
};

export default Paginate;
