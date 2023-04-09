import React from 'react';
import { useState } from 'react';

import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CouponsScreen from '../screens/CouponsScreen';

const Layout = ({ screen }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  console.log(screen);
  return (
    <div className='App h-screen relative'>
        <head>
            <title>Kamptech</title>
        </head>
      <nav className=' flex flex-wrap items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 left-0 z-50'>
        <div className='container  flex flex-wrap items-center justify-between'>
          <div className='w-full relative flex justify-start lg:w-auto lg:static lg:block lg:justify-start'>
            <button
              className='text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <div className='w-[25px] flex flex-col'>
                <div className='h-[3px] bg-black w-full'></div>
                <div className='h-[3px] bg-black my-[3px] w-full'></div>
                <div className='h-[3px] bg-black w-full'></div>
              </div>
            </button>
            <a
              className='text-md font-bold leading-relaxed flex  mr-4 py-2 whitespace-nowrap items-center  text-black '
              href='/'
            >
                <img src="logo.png" alt="" className='w-[25px] h-[25px] object-contain mr-[4px]' />
                <span>KampTech</span>
            </a>
          </div>
        </div>
      </nav>
      <div
        className={
          navbarOpen
            ? 'inset-y-0 left-0 mt-16 flex w-full bg-black bg-opacity-20 absolute lg:hidden xl:hidden'
            : 'hidden'
        }
        onClick={() => setNavbarOpen(!navbarOpen)}
      ></div>

      {/* Broad Page View */}

      <div className='hidden lg:grid xl:grid grid-cols-6 w-full h-screen pt-16 lg:absolute xl:absolute lg:inset-y-0 xl:inset-y-0 lg:left-0 xl:left-0 lg:top-0 xl:top-0 flex-shrink-0 overflow-hidden'>
        <div className='col-span-1 bg-white h-full flex flex-grow'>
          <div
            className='lg:flex  flex-grow items-start h-full bg-white'
            id='example-navbar-danger'
          >
            <ul className='flex flex-col list-none lg:ml-auto px-3 w-full  '>
              <li className='nav-item  hover:bg-gray-300/20'>
                <a
                  className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75 '
                  href='/'
                >
                  <GridViewOutlinedIcon />
                  <span className='ml-2'>Dashboard</span>
                </a>
              </li>
              <li className='nav-item hover:bg-gray-300/20'>
                <a
                  className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                  href='/products'
                >
                  <LocalMallOutlinedIcon />
                  <span className='ml-2'>Products</span>
                </a>
              </li>
              <li className='nav-item hover:bg-gray-300/20'>
                <a
                  className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                  href='/category'
                >
                  <FormatListBulletedOutlinedIcon />
                  <span className='ml-2'>Category</span>
                </a>
              </li>
              <li className='nav-item hover:bg-gray-300/20'>
                <a
                  className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                  href='/orders'
                >
                  <ExploreOutlinedIcon />
                  <span className='ml-2'>Orders</span>
                </a>
              </li>
              <li className='nav-item hover:bg-gray-300/20'>
                <a
                  className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                  href='/coupons'
                >
                  <RedeemOutlinedIcon />
                  <span className='ml-2'>Coupons</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='col-span-5 bg-gray-300/30 overflow-auto h-full  w-full flex flex-col'>
        
          {screen === 'dashboard' ? (
            <DashBoardScreen />
          ) : screen === 'products' ? (
            <ProductsScreen />
          ) : screen === 'category' ? (
            <CategoryScreen />
          ) : screen === 'orders' ? (
            <OrdersScreen />
          ) : (
            <CouponsScreen />
          )}
                
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2_MFLhxziJEIX6EpmwB5veWttEiD9BOJnQ&usqp=CAU" alt="" className='w-1/3'/>
  
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2_MFLhxziJEIX6EpmwB5veWttEiD9BOJnQ&usqp=CAU" alt="" className='w-1/3'/>
  
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2_MFLhxziJEIX6EpmwB5veWttEiD9BOJnQ&usqp=CAU" alt="" className='w-1/3'/>
  
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2_MFLhxziJEIX6EpmwB5veWttEiD9BOJnQ&usqp=CAU" alt="" className='w-1/3'/> */}
        </div>
      </div>

      {/* Mobile Page View */}
      <div className='bg-gray-300/30 lg:hidden xl:hidden'>

        {screen === 'dashboard' ? (
          <DashBoardScreen />
        ) : screen === 'products' ? (
          <ProductsScreen />
        ) : screen === 'category' ? (
          <CategoryScreen />
        ) : screen === 'orders' ? (
          <OrdersScreen />
        ) : (
          <CouponsScreen />
        )}
      </div>

      <div className='absolute inset-y-0 left-0  top-0  w-2/3 md:w-1/3 pt-16 flex-shrink-0 lg:hidden xl:hidden '>
        <div
          className={
            'flex flex-grow items-start h-full bg-white    duration-300 ease-in-out z-50' +
            (navbarOpen ? ' flex   translate-x-0' : ' flex  -translate-x-full')
          }
          id='example-navbar-danger'
        >
          <ul className='flex flex-col lg:flex-row list-none lg:ml-auto px-3 w-full  '>
            <li className='nav-item  hover:bg-gray-300/20'>
              <a
                className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75 '
                href='/'
              >
                <GridViewOutlinedIcon />
                <span className='ml-2'>Dashboard</span>
              </a>
            </li>
            <li className='nav-item hover:bg-gray-300/20'>
              <a
                className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                href='/products'
              >
                <LocalMallOutlinedIcon />
                <span className='ml-2'>Products</span>
              </a>
            </li>
            <li className='nav-item hover:bg-gray-300/20'>
              <a
                className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                href='/category'
              >
                <FormatListBulletedOutlinedIcon />
                <span className='ml-2'>Category</span>
              </a>
            </li>
            <li className='nav-item hover:bg-gray-300/20'>
              <a
                className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                href='/orders'
              >
                <ExploreOutlinedIcon />
                <span className='ml-2'>Orders</span>
              </a>
            </li>
            <li className='nav-item hover:bg-gray-300/20'>
              <a
                className='px-3 py-4 flex items-center text-xs  font-bold leading-snug text-black hover:opacity-75'
                href='/coupons'
              >
                <RedeemOutlinedIcon />
                <span className='ml-2'>Coupons</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Layout;
