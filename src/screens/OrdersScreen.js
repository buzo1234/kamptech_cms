import React from "react";

const OrdersScreen = () => {
  return (
    <>
      <div>
        <p className="font-bold mt-4 text-2xl">Manage Orders</p>
      </div>
      <div class="p-4">
        <form>
          <div class="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <div>
              <input
                class="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                type="search"
                name="search"
                placeholder="Search by Customer Name"
              />
            </div>
            <div>
              <select
                class="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                fdprocessedid="j2fnag"
              >
                <option value="Status" hidden="">
                  Status
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
            <div>
              <select
                class="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:shadow-none focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 leading-5 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                fdprocessedid="k3d96r"
              >
                <option value="Order limits" hidden="">
                  Order limits
                </option>
                <option value="5">Last 5 days orders</option>
                <option value="7">Last 7 days orders</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
              </select>
            </div>
          </div>
          <div class="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <div>
              <label class="block text-sm text-left">
                Start Date
              </label>
              <input
                class="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                type="date"
                name="startDate"
              />
            </div>
            <div>
              <label class="block text-sm text-left">
                End Date
              </label>
              <input
                class="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-green-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent"
                type="date"
                name="startDate"
              />
            </div>
            <div>
              <label
                class="block text-sm text-gray-700 dark:text-gray-400"
                style={{ visibility: "hidden" }}
              >
                Download
              </label>
              <button
                type="button"
                class="false flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
                fdprocessedid="c2pr77"
              >
                Download All Orders
                <span class="ml-2 text-base">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrdersScreen;
