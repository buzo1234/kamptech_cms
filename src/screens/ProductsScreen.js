import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { getCategories, getProducts } from '../actions';
import AddProductScreen from '../components/AddProductScreen';
import ProductsView from '../components/ProductsView';
import DeleteProductScreen from '../components/DeleteProductScreen';
import EditProductScreen from '../components/EditProductScreen';

const ProductsScreen = () => {
  const [searching, setSearching] = useState(false);

  const [searchProduct, setSearchProduct] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');

  const [addProduct, setAddProduct] = useState(false);

  const [editProduct, setEditProduct] = useState(false);
  const [editProdData, setEditProdData] = useState();

  const [deleteProduct, setDeleteProduct] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [filterProds, setFilterProds] = useState([]);

  const headers = [
    { label: 'Product Title', key: 'title' },
    { label: 'Model Name', key: 'modelName' },
    { label: 'Model Number', key: 'modelNumber' },
    { label: 'Product Description', key: 'description' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Product Tags', key: 'tags' },
    { label: 'Product Icon', key: 'images' },
    { label: 'Sale Price', key: 'salePrice' },
    { label: 'Cost Price', key: 'costPrice' },
    { label: 'Category', key: 'category' },
    { label: 'Published', key: 'published' },
    // { label: "Colors", key: "color" },
    // { label: "Coupons", key: "coupon" },
    // { label: "Barcode", key: "barcode" },
  ];

  const [allCategories, setAllCategories] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    filterOut();
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProduct, searchCategory, priceFilter]);

 /*  useEffect(() => {
    handlePriceFilter(priceFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFilter]); */

  useEffect(() => {
    if (addProduct || editProduct || deleteProduct) {
      document.body.style.overflow = 'hidden';
      console.log('hidden');
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [addProduct, editProduct, deleteProduct]);

  useEffect(() => {
    getAllCategoriesAndProducts();
  }, [addProduct, editProduct, deleteProduct]);

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
        setFilterProds(response.documents);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleTitleChange = (e) => {
    setSearchProduct(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const filterOut = () => {
    let filterProds = allProducts.filter((product) => {
      const prodname =
        product.title.toLowerCase().includes(searchProduct.toLowerCase()) ||
        searchProduct === null ||
        searchProduct === undefined ||
        searchProduct === '';
      const catval =
        searchCategory === 'All' ||
        searchCategory === undefined ||
        searchCategory === null ||
        product.category.$id === searchCategory;

      return prodname && catval;
    });

    console.log("Before Switch " , filterProds)

    switch (priceFilter) {
      case 'low':
        filterProds = filterProds.sort((a, b) => a.salePrice - b.salePrice);
        console.log(filterProds);
        break;
      case 'high':
        filterProds = filterProds.sort((a, b) => b.salePrice - a.salePrice);
        console.log(filterProds);
        break;
      case 'published':
        filterProds = filterProds.filter((prod) => prod.published === true);
        break;
      case 'unpublished':
        filterProds = filterProds.filter((prod) => prod.published !== true);
        break;
      case 'status-selling':
        filterProds = filterProds.filter((prod) => prod.quantity > 0);
        break;
      case 'status-out-of-stock':
        filterProds = filterProds.filter((prod) => prod.quantity === 0);
        break;
      default:
        break;
    }

    console.log("After Switch " , filterProds)
    
    

    setFilterProds(filterProds);
  };

  /* const handlePriceFilter = (value) => {
    switch (value) {
      case 'low':
        setFilterProds(filterProds.sort((a, b) => a.salePrice - b.salePrice));
        console.log(filterProds);
        break;
      case 'high':
        setFilterProds(filterProds.sort((a, b) => b.salePrice - a.salePrice));
        console.log(filterProds);
        break;
      case 'published':
        setFilterProds(filterProds.filter((prod) => prod.published === true));
        break;
      case 'unpublished':
        setFilterProds(filterProds.filter((prod) => prod.published !== true));
        break;
      case 'status-selling':
        setFilterProds(filterProds.filter((prod) => prod.quantity > 0));
        break;
      case 'status-out-of-stock':
        setFilterProds(filterProds.filter((prod) => prod.quantity === 0));
        break;
      default:
        setFilterProds(filterProds);
        break;
    }
  }; */

  return (
    <>
      <div>
        <p className='font-bold text-2xl pb-3'>Products</p>
      </div>
      <div className='bg-gray-800 px-3 shadow-xs rounded-lg ring-1 ring-black ring-opacity-10 '>
        <form className='py-6 grid grid-cols-2 gap-y-3'>
          <div className='col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1'>
            <CSVLink
              target='_blank'
              headers={headers}
              data={allProducts}
              filename={'TechSouqDubai - Products Catalogue'}
              className='border flex justify-center items-center border-gray-300 hover:border-green-400 hover:text-green-400 dark:text-gray-300 cursor-pointer h-10 w-20 rounded-md focus:outline-none'
            >
              <svg
                stroke='currentColor'
                fill='none'
                strokeWidth='2'
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
                className=''
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                <polyline points='17 8 12 3 7 8'></polyline>
                <line x1='12' y1='3' x2='12' y2='15'></line>
              </svg>
              <span className='text-sm'>Export</span>
            </CSVLink>
          </div>

          <div className='col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex w-full justify-end'>
            <div className='w-full md:w-48 lg:w-48 xl:w-48'>
              <button
                className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-700 border border-transparent focus:ring focus:ring-purple-300 w-full h-12'
                type='button'
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                  setAddProduct(!addProduct);
                }}
              >
                <span>
                  <svg
                    stroke='currentColor'
                    fill='none'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    height='1em'
                    width='1em'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    {!addProduct && (
                      <line x1='12' y1='5' x2='12' y2='19'></line>
                    )}
                    <line x1='5' y1='12' x2='19' y2='12'></line>
                  </svg>
                </span>
                Add a Product
              </button>
            </div>
          </div>
        </form>
      </div>

      {addProduct && (
        <>
          <div className='absolute w-full h-full z-[100] top-0 left-0 bg-black/30 '></div>
          <div
            className='absolute right-0 overflow-auto   z-[200] top-0 6 w-full lg:w-2/3 xl:w-2/3 bg-white transform -translate-x-0 transition duration-300 ease-in-out '
            style={{ minHeight: '100svh', overflow: 'auto' }}
          >
            <AddProductScreen
              formState={setAddProduct}
              categories={allCategories}
            />
          </div>
        </>
      )}

      <div className='p-4 bg-primary rounded-lg mt-12'>
        <form className='py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex'>
          <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
            <input
              className='block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 bg-gray-100 border-transparent'
              type='search'
              name='search'
              placeholder='Search Product'
              value={searchProduct}
              onChange={(e) => handleTitleChange(e)}
            />
            <button
              type='submit'
              className='absolute right-0 top-0 mt-5 mr-1'
            ></button>
          </div>
          <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
            <select
              className='block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 bg-gray-100 border-transparent'
              onChange={(e) => handleCategoryChange(e)}
            >
              <option value='All' selected>
                Category
              </option>
              {allCategories.map((category) => (
                <option value={category.$id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow'>
            <select
              className='block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 bg-gray-100 border-transparent'
              onChange={(e) => {
                setPriceFilter(e.target.value);
              
              }}
            >
              <option value='All' selected>
                Price
              </option>
              <option value='low'>Low to High</option>
              <option value='high'>High to Low</option>
              <option value='published'>Published</option>
              <option value='unpublished'>Unpublished</option>
              <option value='status-selling'>Status - Selling</option>
              <option value='status-out-of-stock'> Status - Sold Out</option>
            </select>
          </div>
        </form>
      </div>

      {allProducts.length > 0 ? (
        <div className='my-6'>
          <ProductsView
            allProducts={allProducts}
            filter={filterProds}
            setEditId={setEditProdData}
            setShow={setEditProduct}
            show={editProduct}
            setDeleteId={setDeleteId}
            delShow={deleteProduct}
            setDelShow={setDeleteProduct}
          />
        </div>
      ) : (
        <p className='my-6'>No Products yet...</p>
      )}

      {/* Delete Product Screen */}
      {deleteProduct && (
        <>
          <div className='absolute w-full h-full z-[100] top-0 left-0 bg-black/30 '></div>

          <div
            className='absolute  overflow-auto top-0 left-0  z-[200]  w-full h-full bg-transparent flex justify-center items-center mx-auto  '
            style={{ overflow: 'auto' }}
          >
            <DeleteProductScreen
              setShow={setDeleteProduct}
              show={deleteProduct}
              prodId={deleteId}
            />
          </div>
        </>
      )}

      {/* Edit Product Screen */}
      {editProduct && (
        <>
          <div className='absolute w-full h-full z-[100] top-0 left-0 bg-black/30 '></div>

          <div
            className='absolute right-0 overflow-auto   z-[200] top-0 6 w-full lg:w-2/3 xl:w-2/3 bg-white transform -translate-x-0 transition duration-300 ease-in-out '
            style={{ minHeight: '100svh', overflow: 'auto' }}
          >
            <EditProductScreen
              setShow={setEditProduct}
              show={editProduct}
              prodData={editProdData}
              categories={allCategories}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductsScreen;
