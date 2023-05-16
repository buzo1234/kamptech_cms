import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/toggleSwitch.css'

const AddCategoryScreen = ({ setShow, show }) => {
  return (
    <div className='h-screen bg-gray-800 flex z-40 shadow-inner  pt-16 flex-col w-full'>
      <div className='flex justify-between items-center py-6 px-3 bg-gray-900'>
        <div className='flex flex-col mr-2 text-gray-300 '>
          <p className='font-semibold'>Add Category</p>
          <p className='text-xs text-gray-300'>
            Add your Product category and necessary information from here
          </p>
        </div>
        <button
          className='rounded-full shadow-xl p-2 w-[30px] h-[30px]  bg-white text-red-500 text-sm flex justify-center items-center'
          onClick={() => setShow(!show)}
        >
          <CloseIcon style={{width:"20px", height:"20px"}} />
        </button>
      </div>

      <div className='fixed inset-x-0 bottom-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  justify-evenly px-3 py-6 bg-gray-900 gap-x-6 gap-y-3 z-50'>
        <button
          className='bg-gray-700 col-span-1  py-2 w-full rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-700 font-semibold  border border-gray-700'
          onClick={() => setShow(!show)}
        >
          Cancel
        </button>
        <button className='bg-green-400 col-span-1   py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold '>
          Add Category
        </button>
      </div>

      <div className='overflow-y-auto pb-40 bg-gray-800 scrollbar-hide'>
        <form>
          {/* Title */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">Name</p>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <input
                type='text'
                name=''
                id=''
                placeholder='Category title'
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
              />
            </div>
          </div>

          {/* Description */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">Description</p>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <textarea
                type='text'
                name='description'
                rows="4"
                spellCheck={false}
                id=''
                placeholder='Category Description'
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
              />
            </div>
          </div>

          {/* Select Parent Category */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">Parent Category</p>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <select
                name=''
                id=''
                placeholder='Select Parent'
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
              >
                <option value='' disabled selected hidden>
                  Select Parent
                </option>
                <option value='option1'>Set as Parent Category</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
                <option value='option4'>Option 4</option>
              </select>
            </div>
          </div>

          {/* Image */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">Category Image</p>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='w-full text-center'>
                <div
                  className='border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6'
                  role='button'
                  tabindex='0'
                >
                  <input
                    accept='image/*'
                    multiple=''
                    type='file'
                    autocomplete='off'
                    tabindex='-1'
                    style={{ display: 'none' }}
                  />
                  <span className='mx-auto flex justify-center'>
                    <svg
                      stroke='currentColor'
                      fill='none'
                      stroke-width='2'
                      viewBox='0 0 24 24'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      className='text-3xl text-green-500'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <polyline points='16 16 12 12 8 16'></polyline>
                      <line x1='12' y1='12' x2='12' y2='21'></line>
                      <path d='M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3'></path>
                      <polyline points='16 16 12 12 8 16'></polyline>
                    </svg>
                  </span>
                  <p className='text-sm mt-2'>Drag your images here</p>
                  <em className='text-xs text-gray-400'>
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </em>
                </div>
                <div className='text-green-500'></div>
                <aside className='flex flex-row flex-wrap mt-4'></aside>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 ">Published</p>
            </div>
            
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2 relative'>
          
              <label className='flex items-center relative w-max cursor-pointer select-none '  >
                
                <input
                  type='checkbox'
                  className='appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-[0.5px] focus:ring-offset-0  focus:ring-black bg-red-500'
                />
                <span className='absolute font-medium text-xs  right-1 text-white'>
                  {' '}
                  No{' '}
                </span>
                <span className='absolute font-medium text-xs  right-8 text-white'>
                  {' '}
                  Yes{' '}
                </span>
                <span className='w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200' />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryScreen;
