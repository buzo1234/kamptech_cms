import React from 'react';

const DashBoardScreen = () => {
  return (
    <div>
      <p className='font-bold pb-3   text-2xl'>Dashboard preview</p>
      <div class='grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4'>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full'>
          <div class='p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-teal-500'>
            <div class='text-center xl:mb-0 mb-3'>
              <div class='text-center inline-block text-3xl text-white dark:text-green-100 bg-teal-500'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  stroke-width='0'
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
                <p class='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                  Today Orders
                </p>
                <p class='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                  $0.00
                </p>
              </div>
              <div class='flex text-center text-xs font-normal text-gray-50 dark:text-gray-100'>
                <div class='px-1 mt-3'>Cash : $0.00</div>
                <div class='px-1 mt-3'>Card : $0.00</div>
                <div class='px-1 mt-3'>Credit : $0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center h-full'>
          <div class='p-4 border border-gray-200 justify-between dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-orange-100 bg-orange-400'>
            <div class='text-center xl:mb-0 mb-3'>
              <div class='text-center inline-block text-3xl text-white dark:text-orange-100 bg-orange-400'>
                <svg
                  stroke='currentColor'
                  fill='currentColor'
                  stroke-width='0'
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
                <p class='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                  Yesterday Orders
                </p>
                <p class='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                  $1260.00
                </p>
              </div>
              <div class='flex text-center text-xs font-normal text-gray-50 dark:text-gray-100'>
                <div class='px-1 mt-3'>Cash : $1260.00</div>
                <div class='px-1 mt-3'>Card : $0.00</div>
                <div class='px-1 mt-3'>Credit : $0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full'>
          <div class='p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-blue-500'>
            <div class='text-center inline-block text-3xl text-white dark:text-green-100 bg-blue-500'>
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
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
              <p class='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                This Month
              </p>
              <p class='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                $10914.72
              </p>
            </div>
          </div>
        </div>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex justify-center text-center h-full'>
          <div class='p-4 border border-gray-200 dark:border-gray-800 w-full p-6 rounded-lg text-white dark:text-green-100 bg-green-500'>
            <div class='text-center inline-block text-3xl text-white dark:text-green-100 bg-green-500'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                stroke-width='0'
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
              <p class='mb-3 text-base font-medium text-gray-50 dark:text-gray-100'>
                All-Time Sales
              </p>
              <p class='text-2xl font-bold leading-none text-gray-50 dark:text-gray-50'>
                $42348.78
              </p>
            </div>
          </div>
        </div>
      </div>








      {/* Next  */}
      <div class='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div class='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div class='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500'>
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
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
              <h6 class='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Total Order</span>{' '}
              </h6>
              <p class='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                64
              </p>
            </div>
          </div>
        </div>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div class='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div class='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500'>
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
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
              <h6 class='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Orders Pending</span>{' '}
                <span class='text-red-500 text-sm font-semibold'>
                  (7095.13)
                </span>
              </h6>
              <p class='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                11
              </p>
            </div>
          </div>
        </div>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div class='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div class='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500'>
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
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
              <h6 class='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Orders Processing</span>{' '}
              </h6>
              <p class='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                11
              </p>
            </div>
          </div>
        </div>
        <div class='min-w-0 rounded-lg ring-1 ring-black ring-opacity-4 overflow-hidden bg-white dark:bg-gray-800 flex h-full'>
          <div class='p-4 flex items-center border border-gray-200 dark:border-gray-800 w-full rounded-lg'>
            <div class='flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-green-600 dark:text-green-100 bg-green-100 dark:bg-green-500'>
              <svg
                stroke='currentColor'
                fill='none'
                stroke-width='2'
                viewBox='0 0 24 24'
                stroke-linecap='round'
                stroke-linejoin='round'
                height='1em'
                width='1em'
                xmlns='http://www.w3.org/2000/svg'
              >
                <polyline points='20 6 9 17 4 12'></polyline>
              </svg>
            </div>
            <div>
              <h6 class='text-sm mb-1 font-medium text-gray-600 dark:text-gray-400'>
                <span>Orders Delivered</span>{' '}
              </h6>
              <p class='text-2xl font-bold leading-none text-gray-600 dark:text-gray-200'>
                41
              </p>
            </div>
          </div>
        </div>
      </div>








      {/* Recent Order */}
      <p className='font-bold pb-3  mt-6 text-2xl'>Recent Orders</p>
    </div>
  );
};

export default DashBoardScreen;
