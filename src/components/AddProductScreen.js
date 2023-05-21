import React, { useState } from "react";

function AddProductScreen({ formState, categories }) {
  const [rowCount, setRowCount] = useState(0);

  return (
    <div className="absolute right-0 overflow-auto z-[200] top-0 w-full h-full lg:w-[80%] xl:w-[80%] bg-primary transform -translate-x-0 transition duration-300 ease-in-out">
      <button
        className="absolute focus:outline-none z-10 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
        onClick={() => formState(false)}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className="w-full relative p-6 border-b border-gray-700 bg-gray-800 text-gray-300">
        <div className="flex md:flex-row flex-col justify-between mr-20">
          <div>
            <h4 className="text-xl font-medium dark:text-gray-300">
              Add Product
            </h4>
            <p className="mb-0 text-sm dark:text-gray-300">
              Add your product and necessary information from here
            </p>
          </div>
        </div>
      </div>
      <form>
        <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Title/Name
            </label>
            <div className="col-span-8 sm:col-span-4">
              <input
                className="block w-full px-3 py-1 text-sm dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 focus:outline-none bg-gray-100 border-transparent"
                type="text"
                name="title"
                placeholder="Product Title/Name"
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Description
            </label>
            <div className="col-span-8 sm:col-span-4">
              <textarea
                className="block p-3 w-full text-sm dark:text-gray-300 rounded-md focus:outline-none form-textarea focus:border-purple-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-purple-300 border bg-gray-100 border-transparent"
                name="description"
                placeholder="Product Description"
                rows="4"
                spellCheck={true}
              ></textarea>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Images
            </label>
            <div className="col-span-8 sm:col-span-4">
              <div className="w-full text-center">
                <div
                  className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
                  role="button"
                  tabIndex="0"
                >
                  <input
                    accept="image/*"
                    multiple={true}
                    type="file"
                    autoComplete="off"
                    tabIndex="-1"
                    style={{ display: "none" }}
                  />
                  <span className="mx-auto flex justify-center">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-3xl text-green-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </span>
                  <p className="text-sm mt-2">Drag your images here</p>
                  <em className="text-xs text-gray-400">
                    (Only *.jpeg, *.webp and *.png images will be accepted)
                  </em>
                </div>
                <div className="text-green-500"></div>
                <aside className="flex flex-row flex-wrap mt-4"></aside>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium text-sm">
              Category
            </label>
            <div className="col-span-8 sm:col-span-4">
              <div className="mb-2">
                <div>
                  <select
                    name="category"
                    id="category"
                    className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 bg-gray-100 border-transparent"
                  >
                    <option value="" defaultChecked={true}>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Price
            </label>
            <div className="col-span-8 sm:col-span-4">
              <div className="flex flex-row">
                <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                  $
                </span>
                <input
                  className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50 h-12 p-2 border rounded-l-none"
                  type="number"
                  name="originalPrice"
                  placeholder="Original Price"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Sale Price
            </label>
            <div className="col-span-8 sm:col-span-4">
              <div className="flex flex-row">
                <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                  $
                </span>
                <input
                  className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50  h-12 p-2 border rounded-l-none"
                  type="number"
                  name="price"
                  placeholder="Sale price"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Quantity
            </label>
            <div className="col-span-8 sm:col-span-4">
              <div className="flex flex-row">
                <input
                  className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 bg-gray-50  h-12 p-2 border"
                  type="number"
                  name="stock"
                  placeholder="Product Quantity"
                  value=""
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Product Tags
            </label>
            <div className="col-span-8 sm:col-span-4">
              <div className="react-tag-input">
                <input
                  className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 bg-gray-100 border-transparent"
                  placeholder="Product Tag (Write then press enter to add new tag)"
                  value=""
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-400 col-span-4 sm:col-span-2 font-medium">
              Specifications
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProductScreen;
