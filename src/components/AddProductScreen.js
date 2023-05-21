import React, { useState, useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function AddProductScreen({ formState, categories,  show}) {
  const [rowCount, setRowCount] = useState(0);
  const [specifications, setSpecifications] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const parentList = [{id:123, name:'MSI'},{id:234, name:'AIROCIDE'} ];

  /* Files */
  const [files, setFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const fileInputRef = useRef(null);

  const handleRemoveField = (event, index) => {
    event.preventDefault();
    setRowCount(rowCount - 1);
    setSpecifications([...specifications].splice(index, 1));
  };

  const handleSpecification = () => {
    const specificationObject = {};
    // specificationObject[key] = value;
  };

  /* Files */
  const handleDrop = async (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      setFiles(files);
      const reader = new FileReader();
      if (files && files[0].type.match('image.*')) {
        reader.onload = (event) => {
          setThumbnail([...thumbnail, event.target.result]);
        };
        reader.readAsDataURL(event.dataTransfer.files);
      }
    }

    console.log('files', files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files;
    setFiles(selectedFile);

    const reader = new FileReader();
    if (selectedFile && selectedFile[0].type.match('image.*')) {
      reader.onload = (event) => {
        setThumbnail([...thumbnail, event.target.result]);
      };
      reader.readAsDataURL(e.target.files);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className=' bg-gray-800 flex z-40 shadow-inner  flex-col w-full fixed overflow-auto'
      style={{ height: '100svh' }}
    >
      <div className='flex justify-between items-center py-6 px-3 bg-gray-900'>
        <div className='flex flex-col mr-2 text-gray-300 '>
          <p className='font-semibold'>Add Product</p>
          <p className='text-xs text-gray-300'>
            Add your product and necessary information from here
          </p>
        </div>
        <button
          className='rounded-full shadow-xl p-2 w-[30px] h-[30px]  bg-white text-red-500 text-sm flex justify-center items-center'
          onClick={() => formState(false)}
        >
          <CloseIcon style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      <div className='fixed inset-x-0 bottom-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  justify-evenly px-3 py-6 bg-gray-900 gap-x-6 gap-y-3 z-50'>
        <button
          className='bg-gray-700 col-span-1  py-2 w-full rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-700 font-semibold  border border-gray-700'
          onClick={() => formState(false)}
        >
          Cancel
        </button>
        <button className='bg-green-400 col-span-1   py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold '>
          Add Product
        </button>
      </div>

      <div className='overflow-y-auto pb-40 bg-gray-800 scrollbar-hide'>
        <form>
          {/* Title */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
                Product Title
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <input
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
                type='text'
                name='title'
                placeholder='Product Title/Name'
              />
            </div>
          </div>

          {/* Description */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
                Product Description
              </label>
            </div>

            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <textarea
                className='block p-3 w-full text-sm px-3 py-1 text-gray-300 rounded-md focus:outline-none form-textarea  border-gray-600 focus:border-gray-500 bg-gray-700 focus:ring-gray-700 focus:ring  border  border-transparent'
                name='description'
                placeholder='Product Description'
                rows='4'
                spellCheck={true}
              ></textarea>
            </div>
          </div>

          {/* Images */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
                Product Images
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='w-full text-center'>
                <div
                  className='border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6'
                  role='button'
                  tabindex='0'
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleDivClick}
                >
                  <input
                    onChange={handleFileSelect}
                    accept='image/*'
                    multiple='true'
                    type='file'
                    autocomplete='off'
                    ref={fileInputRef}
                    id='fileInput'
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
                  <p className='text-sm mt-2'>Drag your image here</p>
                  <em className='text-xs text-gray-400'>
                    (Only *.jpeg, *.webp and *.png image will be accepted)
                  </em>
                </div>
                {files ? (
                  <div className='flex flex-wrap w-full justify-center flex-col items-center mt-3'>
                    {/* <p>Selected file: {files.name}</p>
                    <p>File size: {files.size} bytes</p> */}
                    {thumbnail.map((thumb, index) => {
                      <img
                        src={thumb}
                        alt='Thumbnail'
                        className='w-3/4 object-contain rounded-md'
                      />;
                    })}
                  </div>
                ) : (
                  ''
                )}

                <div className='text-green-500'></div>
                <aside className='flex flex-row flex-wrap mt-4'></aside>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
                Category
              </label>
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
                {parentList.map((val, index) => (
                  <option value={`${val.$id}&&${val.name}`} key={index} className='text-white'>
                    {val.name}
                  </option>
                ))}
                {/*  <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option> */}
              </select>
            </div>
          </div>


          {/* Product Price */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
          <div className='col-span-1 px-3'>
            <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
              Product Price
            </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='flex flex-row'>
                <span className='inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600'>
                  $
                </span>
                <input
                  className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none rounded-l-none '
                  type='number'
                  name='originalPrice'
                  placeholder='Original Price'
                  step='0.01'
                />
              </div>
            </div>
          </div>

          {/* Sale Price */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
          <div className='col-span-1 px-3'>
            <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
              Sale Price
            </label>
            </div>

            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='flex flex-row'>
                <span className='inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600'>
                  $
                </span>
                <input
                  className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none rounded-l-none '
                  type='number'
                  name='price'
                  placeholder='Sale price'
                  step='0.01'
                />
              </div>
            </div>
          </div>

          {/* Product Quantity */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
          <div className='col-span-1 px-3'>
            <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
              Product Quantity
            </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
             
                <input
                  className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
                  type='number'
                  name='stock'
                  placeholder='Product Quantity'
                  value=''
                />
             
            </div>
          </div>


          {/* Product Tags */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
          <div className='col-span-1 px-3'>
            <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
              Product Tags
            </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className=''>
                <input
                  className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
                  placeholder='Product Tag (Write then press enter to add new tag)'
                  value=''
                />
              </div>
            </div>
          </div>


          {/* Specifications */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
          <div className='col-span-1 px-3'>
            <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 '>
              Specifications
            </label>
            </div>

            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='flex w-full items-center mb-4 space-x-2'>
                <button
                  className='border-0 border-white border-solid px-4 py-2 bg-gray-600 rounded-md '
                  onClick={(e) => {
                    e.preventDefault();
                    setRowCount(rowCount + 1);
                  }}
                >
                  + Add Row
                </button>
                <button className='bg-green-600 text-white px-4 py-2 rounded-md'>
                  Done
                </button>
              </div>
              <div className='flex flex-col w-full overflow-auto'>
              {Array.from({ length: rowCount }).map((index) => (
                <div className='flex mb-2' key={index}>
                  <input
                    type='text'
                    placeholder='key'
                    className='block px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-500 bg-gray-700 border h-12 border-transparent mr-10 col-span-2'
                  />
                  <input
                    type='text'
                    placeholder='value'
                    className='block px-3 py-1 text-sm focus:outline-none focus:border-gray-200 bg-gray-700 dark:text-gray-300 leading-5 rounded-md border h-12 border-transparent col-span-2'
                  />
                  <button
                    className='mx-4'
                    onClick={(e) => handleRemoveField(e, index)}
                  >
                    <svg
                      stroke='currentColor'
                      fill='none'
                      strokeWidth='2'
                      viewBox='0 0 24 24'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='mx-auto'
                      height='1em'
                      width='1em'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <line x1='18' y1='6' x2='6' y2='18'></line>
                      <line x1='6' y1='6' x2='18' y2='18'></line>
                    </svg>
                  </button>
                </div>
              ))}
              </div>
            </div>
          </div>

          {/* Added Specs */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
          <div className='col-span-1 px-3'>
            <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0'>
              Added Specifications
            </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-3'>
              {specifications.length > 0 ? (
                specifications.map((spec) => (
                  <div className='flex w-full text-gray-300'>
                    <label className='mr-6'>{spec.key}</label>
                    <label>{spec.value}</label>
                  </div>
                ))
              ) : (
                <p className='text-gray-300 text-sm col-span-4'>
                  No Specifications mentioned
                </p>
              )}
            </div>
          </div>


          {/* Published */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <p className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 '>
                Published
              </p>
            </div>

            <div
              className='col-span-1 lg:col-span-3 xl:col-span-3 px-2 relative cursor-pointer'
             /*  onClick={() =>
                setcategoryData({
                  ...categoryData,
                  published: !categoryData.published,
                })
              } */
            >
              <input
                type='checkbox'
                /* checked={categoryData.published} */
                class='sr-only peer'
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[13px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductScreen;
