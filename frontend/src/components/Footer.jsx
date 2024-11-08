import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>01778571951</li>
            <li>robiulislam.1711@gmail.com</li>
           
          </ul>
          <ul className="flex mt-5 space-x-4">
        <li className="bg-[#a91079] hover:bg-[#a91079e2] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
      <Link to='https://www.facebook.com/profile.php?id=61556410296598' target="_blank">
        <FiFacebook className='text-white text-2xl' />
      </Link>
        </li>
   
        <li className="bg-[#a91079] hover:bg-[#a91079e2] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
         <Link to="https://www.instagram.com/nabascorner00/" target="_blank"><FaInstagram className='text-white text-2xl'/></Link>
        </li>
      </ul>
        </div>
      </div>
        <div >
            <hr/>
            <p className="py-5 text-sm text-center ">Copyright 2024 © Ashiq.dev - All Right Reserved.</p>
        </div>
    </div>
  );
};

export default Footer;
