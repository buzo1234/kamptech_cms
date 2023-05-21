import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { getCategories, getProducts } from "../actions";
import AddProductScreen from "../components/AddProductScreen";

const ProductsScreen = () => {
  const [addProduct, setAddProduct] = useState(false);

  const headers = [
    { label: "Product Title", key: "title" },
    { label: "Model Name", key: "modelName" },
    { label: "Model Number", key: "modelNumber" },
    { label: "Product Description", key: "description" },
    { label: "Quantity", key: "quantity" },
    { label: "Product Tags", key: "tags" },
    { label: "Product Images", key: "images" },
    { label: "Sale Price", key: "salePrice" },
    { label: "Cost Price", key: "costPrice" },
    { label: "Category", key: "category" },
    { label: "Published", key: "published" },
    // { label: "Colors", key: "color" },
    // { label: "Coupons", key: "coupon" },
    // { label: "Barcode", key: "barcode" },
  ];

  const [allCategories, setAllCategories] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllCategoriesAndProducts();
  }, []);

  const getAllCategoriesAndProducts = async () => {
    await getCategories()
      .then((response) => {
        setAllCategories(response.documents);
        console.log(response.documents);
      })
      .catch((e) => console.log(e.message));

    await getProducts()
      .then((response) => {
        setAllProducts(response.documents);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  return (
    <>
      <div>
        <p className="font-bold text-2xl">Products</p>
      </div>
      <div>
        <form className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex">
          <div className="flex justify-start xl:w-1/2  md:w-full">
            <div className=" lg:flex md:flex flex-grow-0">
              <div className="flex">
                <div className="lg:flex-1 md:flex-1 mr-3 sm:flex-none">
                  <CSVLink
                    target="_blank"
                    headers={headers}
                    data={allProducts}
                    filename={"TechSouqDubai - Products Catalogue"}
                    className="border flex justify-center items-center border-gray-300 hover:border-green-400 hover:text-green-400  dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className=""
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-xs">Export</span>
                  </CSVLink>
                </div>
                <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
                  <button className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300 dark:text-gray-300 cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className=""
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span className="text-xs">Import</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
            <div className="w-full md:w-40 lg:w-40 xl:w-40 mr-3 mb-3 lg:mb-0">
              <button
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-500 border border-transparent opacity-50 w-full h-12 btn-gray sm:mb-3"
                disabled=""
                type="button"
              >
                <span className="">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </span>
                Bulk Action
              </button>
            </div>
            <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
              <button
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white border border-transparent opacity-50 w-full h-12 disabled btn-red bg-red-500"
                disabled=""
                type="button"
              >
                <span className="">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </span>
                Delete
              </button>
            </div>
            <div className="w-full md:w-48 lg:w-48 xl:w-48">
              <button
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-700 border border-transparent focus:ring focus:ring-purple-300 w-full h-12"
                type="button"
                onClick={() => setAddProduct(!addProduct)}
              >
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {!addProduct && (
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                    )}
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
                {!addProduct ? "Add a Product" : "Cancel"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {addProduct && (
        <AddProductScreen
          formState={setAddProduct}
          categories={allCategories}
        />
      )}

      <div className="p-4 bg-primary rounded-lg mt-12">
        <form className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <input
              className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 bg-gray-100 border-transparent"
              type="search"
              name="search"
              placeholder="Search Product"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-5 mr-1"
            ></button>
          </div>
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 bg-gray-100 border-transparent">
              <option value="All" hidden="">
                Category
              </option>
            </select>
          </div>
          <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
            <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 bg-gray-100 border-transparent">
              <option value="All" hidden="">
                Price
              </option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
              <option value="published">Published</option>
              <option value="unPublished">Unpublished</option>
              <option value="status-selling">Status - Selling</option>
              <option value="status-out-of-stock">
                {" "}
                Status - Out of Stock
              </option>
              <option value="date-added-asc">Date Added (Asc)</option>
              <option value="date-added-desc">Date Added (Desc)</option>
              <option value="date-updated-asc">Date Updated (Asc)</option>
              <option value="date-updated-desc">Date Updated (Desc)</option>
            </select>
          </div>
        </form>
      </div>

      <div className="w-full overflow-x-auto mt-10">
        <table className="rounded-lg border-0 border-white border-solid  whitespace-nowrap">
          <thead className="text-xs font-semibold text-left uppercase border-gray-700 text-gray-400 bg-gray-800">
            <tr>
              <td className="px-4 py-3 w-[1/9]">Image</td>
              <td className="px-4 py-3 w-[1/9]">Product Name</td>
              <td className="px-4 py-3 w-[1/9]">Qty</td>
              <td className="px-4 py-3 w-[1/9]">Tags</td>
              <td className="px-4 py-3 w-[1/9]">Category</td>
              <td className="px-4 py-3 w-[1/9]">Published</td>
              <td className="px-4 py-3 w-[1/9]">Sale Price</td>
              <td className="px-4 py-3 w-[1/9]">Cost Price</td>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map(
              ({
                $id,
                title,
                images,
                modelName,
                modelNumber,
                description,
                tags,
                quantity,
                salePrice,
                category,
                published,
                costPrice,
              }) => (
                <tr key={$id}>
                  <td className="px-4 py-3 w-[1/9]">{images[0]}</td>
                  <td className="px-4 py-3 w-[1/9]">{title}</td>
                  <td className="px-4 py-3 w-[1/9]">{quantity}</td>
                  {/* tags should be mapped */}
                  <td className="px-4 py-3 w-[1/9]">{tags}</td>
                  <td className="px-4 py-3 w-[1/9]">{category.name}</td>
                  <td className="px-4 py-3 w-[1/9]">{published}</td>
                  <td className="px-4 py-3 w-[1/9]">{salePrice}</td>
                  <td className="px-4 py-3 w-[1/9]">{costPrice}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsScreen;
