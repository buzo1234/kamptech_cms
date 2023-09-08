import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderByInvoice } from "../actions";
import { useSelector } from "react-redux";
import { getCurrency } from "../app/currencySlice";

const InvoiceScreen = () => {
  const { invoiceId } = useParams();
  const [order, setOrder] = useState({});
  const currency = useSelector(getCurrency);
  const conversionRate = 3.67;

  const [formattedTime, setFormattedTime] = useState("");
  const [orderedProducts, setOrderedProducts] = useState([]);

  useEffect(() => {
    const getCurrentOrder = async () => {
      const order = await getOrderByInvoice(invoiceId);
      if (order) {
        setOrder(order);
        const orderedItems = [];
        for (let o of order.products) {
          orderedItems.push(JSON.parse(o));
        }
        setOrderedProducts(orderedItems);
        console.log(order);

        const dateTime = new Date(order.orderTime);
        const day = dateTime.getDate().toString().padStart(2, "0");
        const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
        const year = dateTime.getFullYear().toString();

        // Extract time components
        const hours = dateTime.getUTCHours().toString().padStart(2, "0");
        const minutes = dateTime.getUTCMinutes().toString().padStart(2, "0");

        // Formatted date and time strings
        const formattedTime = `${day}/${month}/${year} - ${hours}:${minutes}`;
        setFormattedTime(formattedTime);
      }
    };
    getCurrentOrder();
  }, []);

  const downloadInvoicePdf = () => {};

  return (
    <>
      <div className="bg-primary px-8 py-6 rounded-lg">
        <div class="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
          <h1 class="font-bold  text-xl8 uppercase">
            Invoice
            <p class="text-xs mt-1 text-gray-500">
              Status
              <span class="pl-2 font-medium text-xs capitalize">
                {" "}
                <span class="">
                  <span class="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-100">
                    {order.Status}
                  </span>
                </span>
              </span>
            </p>
          </h1>
          <div class="lg:text-right text-left">
            <h2 class="lg:flex lg:justify-end text-lg  font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
              Address:
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {order.address}
            </p>
          </div>
        </div>
        <div class="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
          <div class="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span class="font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
              DATE
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 block">
              <span>{formattedTime}</span>
            </span>
          </div>
          <div class="mb-3 md:mb-0 lg:mb-0 flex flex-col">
            <span class="font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
              INVOICE NO
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 block">
              {invoiceId}
            </span>
          </div>
          <div class="flex flex-col lg:text-right text-left">
            <span class="font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
              INVOICE TO
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400 block">
              {order.customer} <br />
              {order.email}
            </span>
          </div>
        </div>

        <div>
          <div class="w-full overflow-hidden border border-gray-200 dark:border-secondary rounded-lg ring-1 ring-black ring-opacity-5 my-8">
            <div class="w-full overflow-x-auto">
              <table class="w-full whitespace-no-wrap">
                <thead class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-400 dark:bg-secondary">
                  <tr>
                    <td class="px-4 py-3">SR.</td>
                    <td class="px-4 py-3">Product Title</td>
                    <td class="px-4 py-3 text-center">QUANTITY</td>
                    <td class="px-4 py-3 text-center">ITEM PRICE</td>
                    <td class="px-4 py-3 text-right">AMOUNT</td>
                  </tr>
                </thead>
                <tbody class="divide-gray-700 bg-secondary text-gray-400 dark:text-gray-400 divide-y text-sm">
                  {orderedProducts.map((oP, idx) => (
                    <tr key={idx} class="border-secondary text-gray-400">
                      <td class="px-4 py-3 whitespace-nowrap font-normal text-gray-400 text-left">
                        {idx + 1}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap font-normal text-gray-400">
                        {oP.product.title}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap font-bold text-center">
                        {oP.quantity}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap font-bold text-center">
                        {currency === "usd"
                          ? "$" +
                            (oP.product.salePrice / conversionRate).toFixed(2)
                          : "AED " + oP.product.salePrice}
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-right font-bold text-red-500 dark:text-green-500">
                        {currency === "usd"
                          ? "$" +
                            (
                              (oP.product.salePrice * oP.quantity) /
                              conversionRate
                            ).toFixed(2)
                          : "AED " + oP.product.salePrice * oP.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="rounded-xl my-4 px-4 py-6 bg-secondary border-primary border-solid border-[1px]">
          <div class="flex lg:flex-row md:flex-row flex-col justify-between">
            <div class="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span class="mb-1 font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
                PAYMENT METHOD
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400 font-semibold block">
                Cash
              </span>
            </div>
            <div class="flex flex-col sm:flex-wrap">
              <span class="mb-1 font-bold text-sm uppercase text-gray-600 dark:text-gray-500 block">
                TOTAL AMOUNT
              </span>
              <span class="text-xl font-bold text-red-500 dark:text-green-500 block">
                {currency === "usd"
                  ? "$" + (order.amount / conversionRate).toFixed(2)
                  : "AED " + order.amount}
              </span>
            </div>
          </div>
        </div>
        <div class="mb-4 mt-3 flex justify-end">
          <button
            class="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto"
            onClick={downloadInvoicePdf}
          >
            Download Invoice
            <span class="ml-2">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default InvoiceScreen;
