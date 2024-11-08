import React from 'react'

const NewLetterbox = () => {
    const onSubmitHandeler=(e)=>{
e.preventDefault()
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
    <p className='text-gray-500 mt-10'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
   <form onSubmit={onSubmitHandeler} className='flex w-full sm:w-1/2 items-center gap-3 mx-auto my-6 border pl-3'>
    <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' />
  <button className='bg-black text-white px-10 py-4 text-xs'>SUNSCRIBE</button>
   </form>
    </div>
  )
}

export default NewLetterbox