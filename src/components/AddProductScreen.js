import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function AddProductScreen({ formState, categories }) {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    quantity: '',
    salePrice: '',
    costPrice: '',
    specifications: [],
    tags: [],
    category: '',
    images: [],
    published: '',
  });

  const [currentTag, setCurrentTag] = useState('');

  const [rowCount, setRowCount] = useState(0);

  const [specification, setSpecification] = useState([]);

  const handleTagRemove = (event, index) => {
    const updatedTags = [...productData.tags];
    updatedTags.splice(index, 1);
    setProductData({ ...productData, tags: updatedTags });
  };

  const handleTagInput = (event) => {
    if (
      event.key === 'Enter' &&
      currentTag.trim() !== '' &&
      productData.tags.length < 5
    ) {
      setProductData({
        ...productData,
        tags: [...productData.tags, currentTag.trim()],
      });
      setCurrentTag('');
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...specification];
    updatedRows[index][field] = value;
    setSpecification(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...specification];
    updatedRows.splice(index, 1);
    setSpecification(updatedRows);
  };

  const handleAddSpecifications = (e) => {
    e.preventDefault();
    setProductData({ ...productData, specifications: specification });
  };

  const onProductFormSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div
      className='bg-gray-800 flex z-40 shadow-inner flex-col w-full fixed overflow-auto'
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
        <button
          onClick={onProductFormSubmit}
          className='bg-green-400 col-span-1 py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold '
        >
          Add Product
        </button>
      </div>

      <div className='overflow-y-auto pb-40 bg-gray-800 md:px-4 scrollbar-hide'>
        <form>
          {/* Title */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Product Title
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <input
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none '
                type='text'
                name='title'
                placeholder='Product Title/Name'
                onChange={(e) =>
                  setProductData({ ...productData, title: e.target.value })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
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
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>
          </div>

          {/* Images */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Product Images
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='w-full text-center'>
                <div
                  className='border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6'
                  role='button'
                  tabindex='0'
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                  // onClick={handleDivClick}
                >
                  <input
                    // onChange={handleFileSelect}
                    accept='image/*'
                    multiple='true'
                    type='file'
                    autocomplete='off'
                    // ref={fileInputRef}
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
                {/* {files ? (
                  <div className="flex flex-wrap w-full justify-center flex-col items-center mt-3">
                    {/* <p>Selected file: {files.name}</p>
                    <p>File size: {files.size} bytes</p> */}
                {/* {thumbnail.map((thumb, index) => {
                      <img
                        src={thumb}
                        alt="Thumbnail"
                        className="w-3/4 object-contain rounded-md"
                      />;
                    })}
                  </div> */}
                {/* ) : (
                  "" */}
                {/* )} */}

                <div className='text-green-500'></div>
                <aside className='flex flex-row flex-wrap mt-4'></aside>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Select Category
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <select
                name=''
                id=''
                placeholder='Select Parent'
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none'
                onChange={(e) =>
                  setProductData({ ...productData, category: e.target.value })
                }
              >
                <option value=''>Select Category</option>
                {categories?.map((category, index) => (
                  <option value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
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
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      costPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Sale Price */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
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
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      salePrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Product Quantity */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Product Quantity
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <input
                className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none'
                type='number'
                name='quantity'
                onChange={(e) =>
                  setProductData({ ...productData, quantity: e.target.value })
                }
                placeholder='Product Quantity'
              />
            </div>
          </div>

          {/* Product Tags */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Product Tags
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div>
                <input
                  type='text'
                  className='block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none'
                  placeholder='Add Unique Product Tags (enter a tag and then press enter, max 5 allowed)'
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    handleTagInput(e);
                  }}
                />
              </div>
              <div className='flex mt-2 mb-2'>
                {productData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className='border-1 bg-green-700 border-white rounded-md border-solid  flex items-center justify-between px-2 py-1 mr-2'
                  >
                    <p>{tag}</p>
                    <CloseIcon
                      className='cursor-pointer'
                      onClick={(e) => {
                        handleTagRemove(e, index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Specifications
              </label>
            </div>

            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-2'>
              <div className='flex w-full items-center mb-4 space-x-2'>
                <div
                  className='border-0 border-white border-solid px-4 py-2 bg-gray-600 rounded-md cursor-pointer '
                  onClick={(e) => {
                    e.preventDefault();
                    setSpecification([
                      ...specification,
                      { key: '', value: '' },
                    ]);
                  }}
                  
                >
                  + Add Row
                </div>
                <button
                  onClick={handleAddSpecifications}
                  className='bg-green-600 text-white px-4 py-2 rounded-md'
                >
                  Done
                </button>
              </div>
              <div className='flex flex-col w-full overflow-auto'>
                {specification.map((_, index) => (
                  <div className='flex mb-2 items-center space-x-3' key={index}>
                    <input
                      type='text'
                      placeholder='key'
                      className='block px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-500 bg-gray-700 border h-12 border-transparent col-span-2'
                      onChange={(e) =>
                        handleRowChange(index, 'key', e.target.value)
                      }
                    />
                    <input
                      type='text'
                      placeholder='value'
                      className='block px-3 py-1 text-sm focus:outline-none focus:border-gray-200 bg-gray-700 dark:text-gray-300 leading-5 rounded-md border h-12 border-transparent col-span-2'
                      onChange={(e) =>
                        handleRowChange(index, 'value', e.target.value)
                      }
                    />
                    <CloseIcon onClick={() => handleRemoveRow(index)} className='cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Added Specs */}
          <div className='grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-4'>
            <div className='col-span-1 px-3'>
              <label className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Added Specifications
              </label>
            </div>
            <div className='col-span-1 lg:col-span-3 xl:col-span-3 px-3'>
              {productData.specifications.length > 0 ? (
                productData.specifications.map((spec) => (
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
              <p className='text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-bold text-gray-300'>
                Published
              </p>
            </div>

            <div
              className='col-span-1 lg:col-span-3 xl:col-span-3 px-2 relative cursor-pointer'
              onClick={() =>
                setProductData({
                  ...productData,
                  published: !productData.published,
                })
              }
            >
              <input
                type='checkbox'
                checked={productData.published}
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
