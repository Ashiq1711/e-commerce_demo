import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContex'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {products}=useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])
  
    useEffect(()=>{
const bestproduct=products.filter((item)=>(item.bestseller))
setBestSeller(bestproduct.slice(0,5))
    },[products])

  return (
    <div className='my-8'>
    <div className="text-center py-8 text-3xl">
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
    </div>
      {/* *******Rendering bestseller component paste here ****** */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            price={item.price}
            name={item.name}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller