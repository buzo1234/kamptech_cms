import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/toggleSwitch.css';
import {
  deleteCategory,
} from '../actions';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

const DeleteCategoryScreen = ({ setShow, show, catId }) => {
  
  const [deleting, setDeleting] = useState(false)

  const handleDeleteCategory = async () => {
    setDeleting(true);
    try {
        console.log(catId);
      await deleteCategory(catId).then((response) => {
        console.log('category deleted ', response);
        setShow(false);
      });
    } catch (error) {
      console.log(error);
    }
    setDeleting(false);
  };

  return (
    <div className=' bg-gray-800 flex z-40 shadow-inner m-3 p-6 rounded-lg  flex-col w-full md:w-1/2 lg:w-1/3 xl:w-1/3  overflow-auto'>
      <div className='flex w-full justify-center items-center flex-col'>
        <DeleteOutlineSharpIcon className='text-red-500 my-6' style={{width:"40px", height:"40px"}} />
      
      <p className='text-xl text-center'>Are you Sure! Want to <span className='text-red-500'>Delete</span> this category?</p>

      <p className='text-sm text-center mt-3 underline'>If this category have any <span className='text-red-500 font-semibold'>Child</span> categories, they will be Deleted too</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-8 w-full gap-3 mb-3'>
      <button
          className='bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600  px-3 py-3 rounded-md'
          onClick={() => setShow(!show)}
        >
          No, keep It
        </button>
      <button onClick={() => handleDeleteCategory()} className={deleting ? 'bg-green-400 hover:bg-green-500 text-white  px-3 py-3 rounded-md cursor-not-allowed disabled' : 'bg-green-400 hover:bg-green-500 text-white  px-3 py-3 rounded-md'}>{deleting ? 'Deleting...' : 'Yes, Delete It'}</button>
      </div>
      
      </div>
    </div>
  );
};

export default DeleteCategoryScreen;
