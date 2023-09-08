import React, { useEffect, useState } from 'react';
import { getOrders } from '../actions';

const DashBoardScreen = ({ currency }) => {
  const [allOrders, setAllOrders] = useState([]);
  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const [totalProcessing, setTotalProcessing] = useState(0);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState({});
  const [todaysOrders, setTodaysOrders] = useState([]);
  const [yesterdaysOrders, setYesterdaysOrders] = useState([]);
  const conversionRate = 3.67;

  useEffect(() => {
    getLatestOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(yesterdaysOrders, todaysOrders)


  const getLatestOrders = async () => {
    await getOrders()
      .then((response) => {
        const allOrders = response.documents;
        setAllOrders(response.documents);
        setTotalOrderCount(response.total);

        const getTotalProcessing = allOrders.filter(
          (item) => item.Status === 'Processing'
        ).length;
        setTotalProcessing(getTotalProcessing);

        const getTotalDelivered = allOrders.filter(
          (item) => item.Status === 'Delivered'
        ).length;
        setTotalDelivered(getTotalDelivered);

        const getTotalPending = allOrders.filter(
          (item) => item.Status === 'Pending'
        );
        let pendingAmount = 0;
        const pendingLength = getTotalPending.length;
        getTotalPending.map((item) => (pendingAmount += item.amount));
        setTotalPendingOrders({ pendingAmount, pendingLength });

        setTodaysOrders(
          response.documents.map((order) =>
            new Date(order.orderTime).getDate() === new Date().getDate()
              ? order
              : { amount: 0, method:order.method }
          )
        );

        setYesterdaysOrders(
          response.documents.map((order) =>
            new Date(order.orderTime).getDate() === new Date().getDate() - 1
              ? order
              : { amount: 0, method:order.method }
          )
        );
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <div>
      <p className='font-bold pb-3   text-2xl'>Dashboard</p>
      <div className='grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4'>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full'>
          <div className='p-4 border border-gray-200 justify-between dark:border-gray-800 w-full rounded-lg text-white dark:text-green-100 bg-teal-500'>
            <div className='text-center xl:mb-0 mb-3'>
              <div className='text-center inline-block text-3xl text-white dark:text-green-100 bg-teal-500'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  version='1.1'
                  viewBox='0 0 16 16'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z'></path>
                </svg>
              </div>
              <div>
                <p className='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                  Today Orders
                </p>
                <p className='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                  {currency === 'usd' ? '$' : 'AED '}
                  {todaysOrders
                    ? parseFloat(
                        todaysOrders.reduce((total, current) => {
                          if (currency === 'aed') {
                            return (total += current.amount);
                          } else {
                            return (total += current.amount / conversionRate);
                          }
                        }, 0.0)
                      ).toFixed(2)
                    : 0}
                </p>
              </div>
              <div className='flex items-center justify-center text-center text-xs font-normal text-gray-50 dark:text-gray-100'>
                <div className='px-1 mt-3'>
                  COD: {currency === 'usd' ? '$' : 'AED '}
                  {parseFloat(
                    todaysOrders.reduce(
                      (total, current) =>
                        current.method === 'COD'
                          ? currency === 'aed'
                            ? (total += current.amount)
                            : (total += current.amount / conversionRate)
                          : 0,
                      0
                    )
                  ).toFixed(2)}
                </div>
                <div className='px-1 mt-3'>
                  Card: {currency === 'usd' ? '$' : 'AED '}
                  {parseFloat(todaysOrders.reduce(
                    (total, current) =>
                      current.method !== 'COD'
                        ? currency === 'aed'
                          ? (total += current.amount)
                          : (total += current.amount / conversionRate)
                        : 0,
                    0
                  )).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full'>
          <div className='p-4 border border-gray-200 justify-between dark:border-gray-800 w-full rounded-lg text-white dark:text-orange-100 bg-orange-400'>
            <div className='text-center xl:mb-0 mb-3'>
              <div className='text-center inline-block text-3xl text-white dark:text-orange-100 bg-orange-400'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  strokeWidth='0'
                  version='1.1'
                  viewBox='0 0 16 16'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M16 5l-8-4-8 4 8 4 8-4zM8 2.328l5.345 2.672-5.345 2.672-5.345-2.672 5.345-2.672zM14.398 7.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199zM14.398 10.199l1.602 0.801-8 4-8-4 1.602-0.801 6.398 3.199z'></path>
                </svg>
              </div>
              <div>
                <p className='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                  Yesterday Orders
                </p>
                <p className='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                  {currency === 'usd' ? '$' : 'AED '}
                  {yesterdaysOrders
                    ? parseFloat(yesterdaysOrders.reduce((total, current) => {
                        if (currency === 'aed') {
                          return (total += current.amount);
                        } else {
                          return (total += current.amount / conversionRate);
                        }
                      }, 0)).toFixed(2)
                    : 0}
                </p>
              </div>
              <div className='flex text-center items-center justify-center text-xs font-normal text-gray-50 dark:text-gray-100'>
                <div className='px-1 mt-3'>
                  COD: {currency === 'usd' ? '$' : 'AED '}
                  {parseFloat(
                    yesterdaysOrders.reduce(
                      (total, current) => 
                        current.method === 'COD'
                          ? currency === 'aed'
                            ? (total += current.amount)
                            : (total += (current.amount ? current.amount : 0) / conversionRate)
                          : 0,
                      0
                    )
                  ).toFixed(2)}
                </div>
                <div className='px-1 mt-3'>
                  Card: {currency === 'usd' ? '$' : 'AED '}
                  {parseFloat(yesterdaysOrders.reduce(
                    (total, current) =>
                      current?.method !== 'COD'
                        ? currency === 'aed'
                          ? (total += current.amount)
                          : (total += current.amount / conversionRate)
                        : 0,
                    0
                  )).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full'>
          <div className='p-4 border border-gray-200 dark:border-gray-800 w-full rounded-lg text-white dark:text-green-100 bg-blue-500'>
            <div className='text-center inline-block text-3xl text-white dark:text-green-100 bg-blue-500'>
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
                <circle cx='9' cy='21' r='1'></circle>
                <circle cx='20' cy='21' r='1'></circle>
                <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
              </svg>
            </div>
            <div>
              <p className='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                This Month
              </p>
              <p className='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                {currency === 'usd' ? '$' : 'AED '}
                {parseFloat(allOrders?.reduce(
                  (total, current) =>
                    new Date(current.orderTime).getMonth() ===
                    new Date().getMonth()
                      ? currency === 'aed'
                        ? (total += current.amount)
                        : (total += current.amount / conversionRate)
                      : 0,
                  0
                )).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full'>
          <div className='p-4 border border-gray-200 dark:border-gray-800 w-full rounded-lg text-white dark:text-green-100 bg-green-500'>
            <div className='text-center inline-block text-3xl text-white dark:text-green-100 bg-green-500'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                version='1.1'
                viewBox='0 0 16 16'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M14.5 2h-13c-0.825 0-1.5 0.675-1.5 1.5v9c0 0.825 0.675 1.5 1.5 1.5h13c0.825 0 1.5-0.675 1.5-1.5v-9c0-0.825-0.675-1.5-1.5-1.5zM1.5 3h13c0.271 0 0.5 0.229 0.5 0.5v1.5h-14v-1.5c0-0.271 0.229-0.5 0.5-0.5zM14.5 13h-13c-0.271 0-0.5-0.229-0.5-0.5v-4.5h14v4.5c0 0.271-0.229 0.5-0.5 0.5zM2 10h1v2h-1zM4 10h1v2h-1zM6 10h1v2h-1z'></path>
              </svg>
            </div>
            <div>
              <p className='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                All-Time Sales
              </p>
              <p className='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                {currency === 'usd' ? '$' : 'AED '}
                {parseFloat(allOrders?.reduce((total, current) => {
                  if (currency === 'aed') {
                    return (total += current.amount);
                  } else {
                    return (total += current.amount / conversionRate);
                  }
                }, 0)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Next  */}
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div className='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div className='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500'>
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
                <circle cx='9' cy='21' r='1'></circle>
                <circle cx='20' cy='21' r='1'></circle>
                <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
              </svg>
            </div>
            <div>
              <h6 className='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Total Orders</span>{' '}
              </h6>
              <p className='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                {totalOrderCount}
              </p>
            </div>
          </div>
        </div>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div className='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div className='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500'>
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
                <polyline points='23 4 23 10 17 10'></polyline>
                <polyline points='1 20 1 14 7 14'></polyline>
                <path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'></path>
              </svg>
            </div>
            <div>
              <h6 className='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Orders Pending</span>{' '}
                <span className='text-red-500 text-sm font-semibold'>
                  {`${
                    currency === 'aed'
                      ? 'AED ' +
                        parseFloat(totalPendingOrders.pendingAmount).toFixed(2)
                      : '$ ' +
                        parseFloat(
                          totalPendingOrders.pendingAmount / conversionRate
                        ).toFixed(2)
                  }`}
                </span>
              </h6>
              <p className='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                {totalPendingOrders.pendingLength}
              </p>
            </div>
          </div>
        </div>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div className='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div className='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500'>
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
                <rect x='1' y='3' width='15' height='13'></rect>
                <polygon points='16 8 20 8 23 11 23 16 16 16 16 8'></polygon>
                <circle cx='5.5' cy='18.5' r='2.5'></circle>
                <circle cx='18.5' cy='18.5' r='2.5'></circle>
              </svg>
            </div>
            <div>
              <h6 className='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Orders Processing</span>{' '}
              </h6>
              <p className='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                {totalProcessing}
              </p>
            </div>
          </div>
        </div>
        <div className='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div className='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div className='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500'>
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
                <polyline points='20 6 9 17 4 12'></polyline>
              </svg>
            </div>
            <div>
              <h6 className='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Orders Delivered</span>{' '}
              </h6>
              <p className='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                {totalDelivered}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Order */}
      <p className='font-bold pb-3 mt-6 text-2xl'>Recent Orders</p>
      <div className='mb-4'>
        <button
          className='px-4 py-2 rounded-lg text-gray-300 bg-primary border-0 border-gray-300 border-solid font-bold'
          onClick={() => getLatestOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className='w-full overflow-hidden border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto'>
        <table className='w-full whitespace-nowrap'>
          <thead className='text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800'>
            <tr>
              <td className='px-4 py-3'>Invoice No.</td>
              <td className='px-4 py-3'>Order Time</td>
              <td className='px-4 py-3'>Customer Name</td>
              <td className='px-4 py-3'>Amount</td>
              <td className='px-4 py-3'>Method</td>
              <td className='px-4 py-3'>Status</td>
            </tr>
          </thead>
          <tbody>
            {allOrders
              ?.map(
                ({
                  $id,
                  invoice,
                  orderTime,
                  customer,
                  product,
                  amount,
                  method,
                  Status,
                }) => {
                  return (
                    <tr key={$id}>
                      <td className='px-4 py-3'>{invoice}</td>
                      <td className='px-4 py-3'>
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(orderTime))}
                      </td>
                      <td className='px-4 py-3'>{customer}</td>
                      <td className='px-4 py-3'>{`${
                        currency === 'usd'
                          ? '$' + (amount / conversionRate).toFixed(2)
                          : 'AED ' + amount
                      }`}</td>
                      <td className='px-4 py-3'>{method}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`${
                            Status === 'Pending'
                              ? 'bg-orange-700 px-2 py-[0.5] rounded-lg text-sm'
                              : Status === 'Cancel'
                              ? 'bg-red-700 px-2 py-[0.5] rounded-lg text-sm'
                              : Status === 'Delivered'
                              ? 'bg-green-700 px-2 py-[0.5] rounded-lg text-sm'
                              : 'bg-blue-700 px-2 py-[0.5] rounded-lg text-sm'
                          }`}
                        >
                          {Status}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )
              .reverse()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoardScreen;
