import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to="/add"
          className="flex gap-2 items-center px-3 py-2 border-r-0 border"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add items</p>
        </NavLink>
        <NavLink
          to="/banner"
          className="flex gap-2 items-center px-3 py-2 border-r-0 border"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Banner Add</p>
        </NavLink>
        <NavLink
          to="/list"
          className="flex gap-2 items-center px-3 py-2 border-r-0 border"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List items</p>
        </NavLink>
        <NavLink
          to="/order"
          className="flex gap-2 items-center px-3 py-2 border-r-0 border"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Order items</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
