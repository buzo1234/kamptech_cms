import React, { useState } from 'react';
import AddCategoryScreen from '../components/AddCategoryScreen';

const CategoryScreen = () => {
  const [addCat, setAddCat] = useState(false);

  return (
    <>
      <div class='p-4 relative z-0'>
      <p className='font-semibold py-3 text-lg px-2'>Category</p>
        <div className='bg-white px-3 shadow-xs rounded-lg ring-1 ring-black ring-opacity-10 '>

        
       
        <form class='py-6 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex '>
          <div class='flex justify-start xl:w-1/2  md:w-full '>
            <div class=' lg:flex md:flex flex-grow-0'>
              <div class='flex'>
                <div class='lg:flex-1 md:flex-1 mr-3 sm:flex-none'>
                  <button
                    class='border flex justify-center items-center border-black hover:border-green-400 hover:text-green-400  dark:text-black cursor-pointer h-10 w-20 rounded-md focus:outline-none'
                    fdprocessedid='k2ha3j'
                  >
                    <svg
                      stroke='currentColor'
                      fill='none'
                      stroke-width='2'
                      viewBox='0 0 24 24'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      class='mr-2'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                      <polyline points='17 8 12 3 7 8'></polyline>
                      <line x1='12' y1='3' x2='12' y2='15'></line>
                    </svg>
                    <span class='text-xs '>Export</span>
                  </button>
                </div>
                <div class='lg:flex-1 md:flex-1 mr-3  sm:flex-none'>
                  <button
                    class='border flex justify-center items-center h-10 w-20 hover:text-yellow-500  border-black dark:text-black cursor-pointer  py-2 hover:border-yellow-500 rounded-md focus:outline-none'
                    fdprocessedid='b9mgoj'
                  >
                    <svg
                      stroke='currentColor'
                      fill='none'
                      stroke-width='2'
                      viewBox='0 0 24 24'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      class='mr-2'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                      <polyline points='7 10 12 15 17 10'></polyline>
                      <line x1='12' y1='15' x2='12' y2='3'></line>
                    </svg>
                    <span class='text-xs'>Import</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class='lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0'>
            <div class='w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0'>
              <button
                class='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent opacity-50 cursor-not-allowed w-full rounded-md h-12 btn-gray text-gray-600 sm:mb-3'
                disabled=''
                type='button'
              >
                <span class='mr-2'>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    stroke-width='2'
                    viewBox='0 0 24 24'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                    <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
                  </svg>
                </span>
                Bulk Action
              </button>
            </div>
            <div class='w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0'>
              <button
                class='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent opacity-50 cursor-not-allowed w-full rounded-md h-12 bg-red-300 disabled btn-red'
                disabled=''
                type='button'
              >
                <span class='mr-2'>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    stroke-width='2'
                    viewBox='0 0 24 24'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <polyline points='3 6 5 6 21 6'></polyline>
                    <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                    <line x1='10' y1='11' x2='10' y2='17'></line>
                    <line x1='14' y1='11' x2='14' y2='17'></line>
                  </svg>
                </span>
                Delete
              </button>
            </div>
            <div className='w-full md:w-48 lg:w-48 xl:w-48'>
              <button
                className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-full rounded-md h-12'
                type='button'
                fdprocessedid='3w9l4i'
                onClick={() => {
                  setAddCat(!addCat);
                  console.log(addCat);
                }}
              >
                <span class='mr-2'>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    stroke-width='2'
                    viewBox='0 0 24 24'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <line x1='12' y1='5' x2='12' y2='19'></line>
                    <line x1='5' y1='12' x2='19' y2='12'></line>
                  </svg>
                </span>
                Add Category
              </button>
            </div>
          </div>
        </form>
      
        
      </div>

      {addCat && (
          <>
            <div className='absolute w-full h-screen -top-16 left-0 bg-black/30'></div>

            <div className='absolute right-0 -top-16 w-full lg:w-1/2 xl:w-1/2 bg-white transform -translate-x-0 transition duration-300 ease-in-out'>
              <AddCategoryScreen setShow={setAddCat} show={addCat} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryScreen;
