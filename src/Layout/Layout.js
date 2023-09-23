import React, { useEffect } from 'react';
import { useState } from 'react';

import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import MergeIcon from '@mui/icons-material/Merge';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import DashBoardScreen from '../screens/DashBoardScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CouponsScreen from '../screens/CouponsScreen';
import { getAccountDetails, logout } from '../actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrency, getCurrency } from '../app/currencySlice';
import NavLinksScreen from '../screens/NavLinksScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import ReDeploy from '../actions/vercelApi';
import { ToastContainer, toast } from 'react-toastify';

const Layout = ({ screen }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currency = useSelector(getCurrency);
  const dispatch = useDispatch();
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [navbarOpen]);

  const getUser = async () => {
    setLoading(true);
    const data = await getAccountDetails();
    setUser(data);
    if (data === undefined) {
      await logoutSession();
    }
    setLoading(false);
  };

  const logoutSession = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (e) {
      console.log(e.message);
    }
  };

  async function handleRedploy() {
    setDeploying(true);
    var timer;
    try {
      const res = await ReDeploy();
      timer = setTimeout(() => {}, 2000);
      if (res.success) {
        toast.success('Deployment Initiated!');
      }
    } catch (err) {
      toast.error('Deployment Failed!');
    } finally {
      clearTimeout(timer);
      setDeploying(false);
    }
  }

  return (
    <div className='App h-screen relative bg-secondary'>
      <ToastContainer />
      {loading ? (
        <div className='flex w-full h-screen justify-center items-center text-white'>
          Loading...
        </div>
      ) : (
        <>
          <nav className=' flex flex-wrap items-center justify-between px-6 py-3 bg-primary sticky top-0 left-0 z-[100]'>
            <div className='w-full flex  items-center justify-between'>
              <div className='w-full relative flex justify-start lg:w-auto lg:static lg:block lg:justify-start'>
                <button
                  className='text-black cursor-pointer text-xl leading-none pr-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
                  type='button'
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                    setNavbarOpen(!navbarOpen);
                  }}
                >
                  <div className='w-[25px] flex flex-col'>
                    <div className='h-[3px] bg-white w-full'></div>
                    <div className='h-[3px] bg-white my-[3px] w-full'></div>
                    <div className='h-[3px] bg-white w-full'></div>
                  </div>
                </button>
                <a
                  className='text-md font-bold leading-relaxed flex  mr-4 py-2 whitespace-nowrap items-center text-white'
                  href='/'
                >
                  <img
                    src='/logo.png'
                    alt=''
                    className='w-[25px] h-[25px] object-contain mr-[4px]'
                  />
                  <span>TechSouqDubai</span>
                </a>
              </div>

              <div className='flex justify-center items-center'>
                <div className='mx-4 '>
                  <select
                    value={currency}
                    className='rounded-lg bg-primary text-white'
                    onChange={(e) => {
                      dispatch(changeCurrency({ currency: e.target.value }));
                    }}
                  >
                    <option value='usd'>USD</option>
                    <option value='aed'>AED</option>
                  </select>
                </div>
                <div className='text-white '>
                  <button
                    onClick={() => logoutSession()}
                    className='bg-gray-700 font-semibold px-3 py-2 rounded-md '
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div
            className={
              navbarOpen
                ? 'inset-y-0 left-0 mt-16 flex z-30 w-full bg-black bg-opacity-20 absolute lg:hidden xl: cursor-pointer'
                : 'hidden '
            }
            onClick={() => setNavbarOpen(!navbarOpen)}
          ></div>

          {/* Broad Page View */}

          <div className='hidden lg:grid xl:grid grid-cols-6 w-full h-screen pt-16 lg:absolute xl:absolute lg:inset-y-0 xl:inset-y-0 lg:left-0 xl:left-0 lg:top-0 xl:top-0 flex-shrink-0 overflow-hidden'>
            <div className='col-span-1 h-full bg-primary flex flex-grow'>
              <div
                className='lg:flex mt-4 flex-grow items-start h-full bg-primary text-gray-400'
                id='example-navbar-danger'
              >
                <ul className='flex flex-col list-none lg:ml-auto px-3 w-full'>
                  <li className='hover:text-white'>
                    <a
                      className='px-3 py-4 flex items-center text-xs font-bold leading-snug'
                      href='/'
                    >
                      <GridViewOutlinedIcon />
                      <span className='ml-2'>Dashboard</span>
                    </a>
                  </li>
                  <li className='hover:text-white'>
                    <a
                      className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                      href='/products'
                    >
                      <LocalMallOutlinedIcon />
                      <span className='ml-2'>Products</span>
                    </a>
                  </li>
                  <li className='hover:text-white'>
                    <a
                      className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                      href='/category'
                    >
                      <FormatListBulletedOutlinedIcon />
                      <span className='ml-2'>Category</span>
                    </a>
                  </li>
                  <li className='hover:text-white'>
                    <a
                      className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                      href='/navlinks'
                    >
                      <MergeIcon />
                      <span className='ml-2'>Navbar</span>
                    </a>
                  </li>
                  <li className='hover:text-white'>
                    <a
                      className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                      href='/orders'
                    >
                      <ExploreOutlinedIcon />
                      <span className='ml-2'>Orders</span>
                    </a>
                  </li>

                  <button
                    disabled={deploying}
                    className={
                      deploying
                        ? 'px-4 py-3 bg-gray-600 rounded-md hover:bg-gray-400 hover:text-white mt-20 cursor-not-allowed'
                        : 'px-4 py-3 bg-gray-600 rounded-md hover:bg-gray-400 hover:text-white mt-20'
                    }
                    onClick={handleRedploy}
                  >
                    {deploying ? 'Deploying...' : 'SEO rebuild'}
                  </button>
                  {/* <li className='hover:text-white'>
                    <a
                      className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                      href='/coupons'
                    >
                      <RedeemOutlinedIcon />
                      <span className='ml-2'>Coupons</span>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>

            <div className='col-span-5 bg-secondary overflow-auto h-full w-full flex flex-col text-white p-6'>
              {screen === 'dashboard' ? (
                <DashBoardScreen currency={currency} />
              ) : screen === 'products' ? (
                <ProductsScreen currency={currency} />
              ) : screen === 'category' ? (
                <CategoryScreen />
              ) : screen === 'orders' ? (
                <OrdersScreen currency={currency} />
              ) : screen === 'navlinks' ? (
                <NavLinksScreen />
              ) : screen === 'invoice' ? (
                <InvoiceScreen />
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
          <div className='lg:hidden xl:hidden text-white bg-secondary p-6'>
            {screen === 'dashboard' ? (
              <DashBoardScreen currency={currency} />
            ) : screen === 'products' ? (
              <ProductsScreen currency={currency} />
            ) : screen === 'category' ? (
              <CategoryScreen />
            ) : screen === 'orders' ? (
              <OrdersScreen currency={currency} />
            ) : screen === 'navlinks' ? (
              <NavLinksScreen />
            ) : screen === 'invoice' ? (
              <InvoiceScreen />
            ) : (
              <CouponsScreen />
            )}
          </div>

          <div
            className={
              'absolute h-full left-0  top-0  w-2/3 md:w-1/3 pt-16 flex-shrink-0 lg:hidden xl:hidden' +
              (navbarOpen
                ? ' z-40 '
                : ' pointer-events-none bg-transparent z-20')
            }
          >
            <div
              className={
                'flex flex-grow items-start h-full bg-primary duration-300 ease-in-out ' +
                (navbarOpen
                  ? ' flex translate-x-0'
                  : ' flex -translate-x-full pointer-events-none')
              }
              id='example-navbar-danger'
            >
              <ul className='flex flex-col lg:flex-row list-none lg:ml-auto px-3 w-full text-gray-400'>
                <li className='nav-item  hover:text-white'>
                  <a
                    className='px-3 py-4 flex items-center text-xs font-bold leading-snug'
                    href='/'
                  >
                    <GridViewOutlinedIcon />
                    <span className='ml-2'>Dashboard</span>
                  </a>
                </li>
                <li className='nav-item hover:text-white'>
                  <a
                    className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                    href='/products'
                  >
                    <LocalMallOutlinedIcon />
                    <span className='ml-2'>Products</span>
                  </a>
                </li>
                <li className='nav-item hover:text-white'>
                  <a
                    className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                    href='/category'
                  >
                    <FormatListBulletedOutlinedIcon />
                    <span className='ml-2'>Category</span>
                  </a>
                </li>
                <li className='nav-item hover:text-white'>
                  <a
                    className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                    href='/navlinks'
                  >
                    <MergeIcon />
                    <span className='ml-2'>Navbar</span>
                  </a>
                </li>
                <li className='nav-item hover:text-white'>
                  <a
                    className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                    href='/orders'
                  >
                    <ExploreOutlinedIcon />
                    <span className='ml-2'>Orders</span>
                  </a>
                </li>
                <button
                  disabled={deploying}
                  className={
                    deploying
                      ? 'px-4 py-3 bg-gray-600 rounded-md hover:bg-gray-400 hover:text-white mt-20 cursor-not-allowed'
                      : 'px-4 py-3 bg-gray-600 rounded-md hover:bg-gray-400 hover:text-white mt-20'
                  }
                  onClick={handleRedploy}
                >
                  {deploying ? 'Deploying...' : 'SEO rebuild'}
                </button>
                {/* <li className='nav-item hover:text-white'>
                  <a
                    className='px-3 py-4 flex items-center text-xs  font-bold leading-snug'
                    href='/coupons'
                  >
                    <RedeemOutlinedIcon />
                    <span className='ml-2'>Coupons</span>
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
