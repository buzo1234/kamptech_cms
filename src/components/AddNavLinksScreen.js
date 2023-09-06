import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/toggleSwitch.css';
import {
  createCategory,
  getCategories,
  login,
  getUserData,
  addCategoryImage,
  getParentCategories,
  createCategoryRelation,
  createNavLink,
} from '../actions';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-tailwindcss-select';

const AddNavLinksScreen = ({ setShow, show }) => {
  const [categoryData, setcategoryData] = useState({
    name: '',
    categories: null,
  });


  const [uploading, setUploading] = useState(false);


  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getAllCategories = async () => {
      await getParentCategories().then((response) => {
        const categories = response.documents;
        var options = [];

        options = categories.map((cat) => {
          return {
            value: cat.$id,
            label: cat.name,
          };
        });

        setCats(options);

      });
    };

    getAllCategories();
  }, []);
 

  const handleChange = (value) => {
    setcategoryData({...categoryData, categories : value});
    
  };

  const handleAddCategory = async () => {
    let formComplete = true;
    if (categoryData.name === '') {
      formComplete = false;
      toast.error('Please enter a navlink name');
    } else if (categoryData.options === null) {
      formComplete = false;
      toast.error('Please Select at least one category');
    } else {
      try {
        setUploading(true);
        if (formComplete) {
          await createNavLink({
            name: categoryData.name,
            categories: categoryData.categories.map(cat => cat.value),
          })
            .then((res) => {
              setUploading(false);
              setShow(false);
            })
            .catch((err) => console.error(err));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className=' bg-gray-800 flex z-40 shadow-inner h-full  flex-col w-full fixed overflow-auto'
      style={{ height: '100svh' }}
    >
      <div className='flex justify-between  items-center py-6 px-3 bg-gray-900'>
        <div className='flex flex-col mr-2 text-gray-300 '>
          <p className='font-semibold'>Add NavLink</p>
          <p className='text-xs text-gray-300'>
            Add your Navbar links and corresponding information here.
          </p>
        </div>
        <button
          className='rounded-full shadow-xl p-2 w-[30px] h-[30px]  bg-white text-red-500 text-sm flex justify-center items-center'
          onClick={() => setShow(!show)}
        >
          <CloseIcon style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      <div className='fixed inset-x-0 bottom-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  justify-evenly px-3 py-6 bg-gray-900 gap-x-6 gap-y-3 z-50'>
        <button
          className='bg-gray-700 col-span-1  py-2 w-full rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-700 font-semibold  border border-gray-700'
          onClick={() => setShow(!show)}
        >
          Cancel
        </button>
        <button
          className={
            uploading
              ? 'bg-green-400 col-span-1   py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold cursor-not-allowed disabled'
              : 'bg-green-400 col-span-1   py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold '
          }
          onClick={() => handleAddCategory()}
        >
          {uploading ? 'Uploading...' : 'Add NavLink'}
        </button>
      </div>

      <div className='overflow-y-auto pb-40 bg-gray-800 h-full scrollbar-hide'>
        <ToastContainer />

        <form>
          {/* Title */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>Name</p>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <input
                onChange={(e) =>
                  setcategoryData({
                    ...categoryData,
                    name: e.target.value,
                  })
                }
                type='text'
                name=''
                id=''
                placeholder='NavLink title'
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
              />
            </div>
          </div>

          {/* Select Parent Category */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
                Group Categories
              </p>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              {/* <select
                onChange={(e) =>
                  setcategoryData({
                    ...categoryData,
                    parent: e.target.value,
                  })
                }
                name=''
                id=''
                placeholder='Select Parent'
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
              >
                <option value='' selected hidden>
                  Select Parent
                </option>

                <option value='isParent'>Set as Parent Category</option>
                {parentList.map((val, index) => (
                  <option value={val.$id} key={index}>
                    {val.name}
                  </option>
                ))}
                
              </select> */}

              <Select
              isMultiple={true}
                value={categoryData.categories}
                onChange={handleChange}
                options={cats}
                
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNavLinksScreen;
