import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-black rounded-lg min-h-screen flex items-center justify-center py-12">
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">About Us</h1>
      <p className="text-gray-600 text-lg text-center mb-8 px-4">
        Welcome to <span className="font-semibold text-teal-500">Craftly</span> – where creativity meets tradition. Our mission is to bring unique, handmade crafts to your home, celebrating the beauty of artisanal work and the stories behind each piece.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col items-center">
          <img src={assets.about_img} alt="Artisan Craft 1" className="w-64 h-64 object-cover rounded-md shadow-lg" />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">Our Inspiration</h2>
          <p className="text-gray-600 text-center mt-2">
            We are inspired by local artisans who pour their heart into each piece, creating items that are not only beautiful but also meaningful.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img src={assets.about_img} alt="Artisan Craft 2" className="w-64 h-64 object-cover rounded-md shadow-lg" />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">Our Process</h2>
          <p className="text-gray-600 text-center mt-2">
            Each craft is thoughtfully curated, ensuring quality and authenticity. From concept to creation, we stay true to traditional techniques.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <h3 className="text-3xl font-semibold text-gray-700">Our Values</h3>
        <p className="text-gray-600 mt-4 px-4">
          At Craftly, we believe in sustainable, ethical practices. Every item is made with love, supporting local communities and promoting eco-friendly crafting methods.
        </p>
      </div>

      <div className="flex justify-center mt-12">
        <button className="bg-teal-500 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-teal-600 transition duration-300">
          Discover Our Collection
        </button>
      </div>
    </div>
  </div>

  );
};

export default About;
