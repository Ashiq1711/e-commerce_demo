import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContex";

const Navbar = () => {
  const {setShowSearch, getCartCount,navigate,token,setToken,setCartItem}=useContext(ShopContext)
  const [visible, setVisible] = useState(false);

  const logout=()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
  }
  return (
    <div className="flex items-center justify-between py-4 font-medium">
      <Link to="/">
      <img src={assets.logo} alt="logo" className="w-[110px]" />
      </Link>
      <div className="py-3 px-8 border border-gray-200 rounded-full hidden sm:block">

      <ul className="hidden sm:flex gap-8 text-sm  text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-600 hidden" />
        </NavLink>
      </ul>
      </div>
      <div className="flex items-center gap-6">
        <img
        onClick={()=>setShowSearch(true)}
          src={assets.search_icon}
          className=" w-5 cursor-pointer"
          alt="search"
        />
        <div className=" group relative">
         
          <img
          onClick={()=>token ? null : navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />
       {/* dropdoen */}
       {token && 
          <div className=" group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-40">
            <div className=" flex flex-col gap-2 w-36 py-3 px-5 text-gray-500 rounded bg-slate-100">
              <p className=" cursor-pointer hover:text-black">My Profile</p>
              <p onClick={()=>navigate('/order')} className=" cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className=" cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
       }
        </div>
        <Link to="/cart" className=" relative">
          <img
            src={assets.cart_icon}
            className="w-5 cursor-pointer min-w-5"
            alt="cart"
          />
          <p className=" absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
          {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu"
          className=" w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* { *******Sidebar Menu for small icon ******} */}
      <div
        className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full " : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className=" cursor-pointer flex items-center gap-4 p-3"
          >
            <img
              className=" h-4 rotate-180"
              src={assets.dropdown_icon}
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border "
            to={"/"}
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/collection"}
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/contact"}
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to={"/about"}
          >
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
