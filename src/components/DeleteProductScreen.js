import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/toggleSwitch.css';
import {
  deleteProduct
} from '../actions';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

const DeleteProductScreen = ({ setShow, show, prodId }) => {
  
  console.log(prodId)
  const handleDeleteProduct = async () => {
    try {
        console.log(prodId);
      await deleteProduct(prodId).then((response) => {
        console.log('product deleted ', response);
        setShow(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' bg-gray-800 flex z-40 shadow-inner m-3 p-6 rounded-lg  flex-col w-full md:w-1/2 lg:w-1/3 xl:w-1/3  overflow-auto'>
      <div className='flex w-full justify-center items-center flex-col'>
        <DeleteOutlineSharpIcon className='text-red-500 my-6' style={{width:"40px", height:"40px"}} />
      
      <p className='text-xl text-center'>Are you Sure! Want to <span className='text-red-500'>Delete</span> this product?</p>

      <p className='text-sm text-center mt-3 underline'>Do you really want to delete these records? You can't view this in your list anymore if you delete!</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-8 w-full gap-3 mb-3'>
      <button
          className='bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600  px-3 py-3 rounded-md'
          onClick={() => setShow(!show)}
        >
          No, keep It
        </button>
      <button onClick={() => handleDeleteProduct()} className='bg-green-400 hover:bg-green-500 text-white  px-3 py-3 rounded-md'>Yes, Delete It</button>
      </div>
      
      </div>
    </div>
  );
};

export default DeleteProductScreen;
