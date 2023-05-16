import React, { useState } from "react";
import { CSVLink } from "react-csv";

const OrdersScreen = () => {
  const sampleOrders = [
    {
      invoice: 10012,
      time: 1455,
      name: "Prathamesh",
      product: "Slippers",
      amount: 2500,
      method: "Cash",
      status: "Pending",
    },
    {
      invoice: 10023,
      time: 1920,
      name: "Karan",
      product: "Shoes",
      amount: 25,
      method: "Card",
      status: "Delivered",
    },
  ];

  const [orders, setOrders] = useState(true);
  const [allOrders, setAllOrders] = useState(sampleOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const headers = [
    { label: "Invoice No.", key: "invoice" },
    { label: "Order Time", key: "time" },
    { label: "Customer Name", key: "name" },
    { label: "Product", key: "product" },
    { label: "Amount", key: "amount" },
    { label: "Method", key: "method" },
    { label: "Status", key: "status" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);

    const filteredResults = sampleOrders.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFiltered(filteredResults);
  };

  return (
    <>
      <div>
        <p className="font-bold lg:mt-4 text-2xl px-6 pt-4">Orders</p>
      </div>
      <div className="p-6 bg-primary m-6 rounded-md">
        <form>
          <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <div>
              <input
                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring-green-300 bg-gray-700 border h-12 border-transparent"
                type="search"
                name="search"
                placeholder="Search by Customer Name"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div>
              <select className="block w-full px-2 py-1 text-sm dark:text-gray-300 focus:outline-none rounded-md form-select dark:border-gray-600 focus:shadow-none dark:focus:border-gray-500 dark:bg-gray-700 leading-5 border h-12 bg-gray-100 border-transparent">
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
              <select className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring-green-300 bg-gray-700 border h-12 border-transparent">
                <option value="Order limits" hidden="">
                  Order limits
                </option>
                <option value="10">Last 10 days orders</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
            <div>
              <label className="block text-sm text-left">Start Date</label>
              <input
                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring-green-300 bg-gray-700 border h-12 border-transparent"
                type="date"
                name="startDate"
              />
            </div>
            <div>
              <label className="block text-sm text-left">End Date</label>
              <input
                className="block w-full px-3 py-1 text-sm focus:outline-none leading-5 rounded-md focus:border-gray-200 border-gray-200 focus:ring-green-300 bg-gray-700 border h-12 border-transparent"
                type="date"
                name="startDate"
              />
            </div>
            <div>
              <label
                className="block text-sm text-gray-700 dark:text-gray-400"
                style={{ visibility: "hidden" }}
              >
                Download
              </label>
              <CSVLink
                target="_blank"
                filename={"TechSouq-All Orders.csv"}
                data={sampleOrders}
                headers={headers}
                className="false flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium focus:outline-none px-6 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300"
              >
                Download All Orders
                <span className="ml-2 text-base">
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
              </CSVLink>
            </div>
          </div>
        </form>
      </div>

      {/* List of all orders in table format */}
      {/* Fetch orders then show them here */}

      <div className="m-6">
        {orders ? (
          <div className="w-full overflow-hidden border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                <tr>
                  <td className="px-4 py-3">Invoice No.</td>
                  <td className="px-4 py-3">Order Time</td>
                  <td className="px-4 py-3">Customer Name</td>
                  <td className="px-4 py-3">Product</td>
                  <td className="px-4 py-3">Amount</td>
                  <td className="px-4 py-3">Method</td>
                  <td className="px-4 py-3">Status</td>
                  <td className="px-4 py-3">Action</td>
                </tr>
              </thead>
              <tbody>
                {searchQuery
                  ? filtered.map(
                      ({
                        invoice,
                        time,
                        name,
                        product,
                        amount,
                        method,
                        status,
                      }) => (
                        <tr key={invoice}>
                          <td className="px-4 py-3">{invoice}</td>
                          <td className="px-4 py-3">{time}</td>
                          <td className="px-4 py-3">{name}</td>
                          <td className="px-4 py-3">{product}</td>
                          <td className="px-4 py-3">{amount}</td>
                          <td className="px-4 py-3">{method}</td>
                          <td className="px-4 py-3">{status}</td>
                          <td className="px-4 py-3">
                            <select className="block w-full text-sm text-gray-300 focus:outline-none rounded-md form-select dark:border-gray-600 focus:shadow-none focus:border-gray-500 dark:bg-gray-700 leading-5 border h-6 bg-gray-100 border-transparent">
                              <option value="Status" hidden="">
                                Status
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Cancel">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      )
                    )
                  : allOrders?.map(
                      ({
                        invoice,
                        time,
                        name,
                        product,
                        amount,
                        method,
                        status,
                      }) => (
                        <tr key={invoice}>
                          <td className="px-4 py-3">{invoice}</td>
                          <td className="px-4 py-3">{time}</td>
                          <td className="px-4 py-3">{name}</td>
                          <td className="px-4 py-3">{product}</td>
                          <td className="px-4 py-3">{amount}</td>
                          <td className="px-4 py-3">{method}</td>
                          <td className="px-4 py-3">{status}</td>
                          <td className="px-4 py-3">
                            <select className="block w-full text-sm text-gray-300 focus:outline-none rounded-md form-select dark:border-gray-600 focus:shadow-none focus:border-gray-500 dark:bg-gray-700 leading-5 border h-6 bg-gray-100 border-transparent">
                              <option value="Status" hidden="">
                                Status
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Cancel">Cancel</option>
                            </select>
                          </td>
                        </tr>
                      )
                    )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No orders yet</div>
        )}
      </div>
    </>
  );
};

export default OrdersScreen;
