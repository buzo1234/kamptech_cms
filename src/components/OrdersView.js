import React, { useEffect } from "react";
import { getOrderById, getOrders, updateOrderStatus } from "../actions";
import { useNavigate } from "react-router-dom";

function OrdersView({
  allOrders,
  setAllOrders,
  isSearching,
  setIsSearching,
  filtered,
  setFiltered,
  setSearchByStatus,
  setSearchQuery,
}) {
  const navigate = useNavigate();

  const handleStatusChange = async (e, id) => {
    e.preventDefault();
    await updateOrderStatus(id, e.target.value)
      .then(async () => {
        await getLatestOrders();
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getLatestOrders();
  }, []);

  const getLatestOrders = async () => {
    setIsSearching(false);
    setSearchByStatus("Status");
    await getOrders()
      .then((response) => {
        setSearchQuery("");
        setFiltered([]);
        setAllOrders(response.documents);
      })
      .catch((e) => console.log(e.message));
  };

  async function navigateToInvoice(event, $id) {
    await getOrderById($id)
      .then((response) => {
        console.log(response);
        // navigate(`invoice`);
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <div className="mt-6 mb-4">
        <button
          className="px-4 py-2 rounded-lg text-gray-300 bg-primary border-0 border-gray-300 border-solid font-bold"
          onClick={() => getLatestOrders()}
        >
          Refresh Orders
        </button>
      </div>
      <div className="">
        {allOrders ? (
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
                {isSearching
                  ? filtered.map(
                      ({
                        $id,
                        invoice,
                        orderTime,
                        customer,
                        product,
                        amount,
                        Method,
                        Status,
                      }) => (
                        <tr key={$id}>
                          <td
                            className="px-4 py-3"
                            onClick={(e) => navigateToInvoice(e, $id)}
                          >
                            {invoice}
                          </td>
                          <td className="px-4 py-3">
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }).format(new Date(orderTime))}
                          </td>
                          <td className="px-4 py-3">{customer}</td>
                          <td className="px-4 py-3">{product}</td>
                          <td className="px-4 py-3">{amount}</td>
                          <td className="px-4 py-3">{Method}</td>
                          <td className="px-4 py-3">{Status}</td>
                          <td className="px-4 py-3">
                            <select
                              className="block w-full text-sm text-gray-300 focus:outline-none rounded-md form-select dark:border-gray-600 focus:shadow-none focus:border-gray-500 dark:bg-gray-700 leading-5 border h-6 bg-gray-100 border-transparent"
                              defaultValue={Status}
                              onChange={(e) => handleStatusChange(e, $id)}
                            >
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
                        $id,
                        invoice,
                        orderTime,
                        customer,
                        product,
                        amount,
                        Method,
                        Status,
                      }) => {
                        return (
                          <tr key={$id}>
                            <td
                              className="px-4 py-3"
                              onClick={(e) => navigateToInvoice(e, $id)}
                            >
                              {invoice}
                            </td>
                            <td className="px-4 py-3">
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(new Date(orderTime))}
                            </td>
                            <td className="px-4 py-3">{customer}</td>
                            <td className="px-4 py-3">{product}</td>
                            <td className="px-4 py-3">{amount}</td>
                            <td className="px-4 py-3">{Method}</td>
                            <td className="px-4 py-3">{Status}</td>
                            <td className="px-4 py-3">
                              <select
                                className="block w-full text-sm text-gray-300 focus:outline-none rounded-md form-select dark:border-gray-600 focus:shadow-none focus:border-gray-500 dark:bg-gray-700 leading-5 border h-6 bg-gray-100 border-transparent"
                                onChange={(e) => handleStatusChange(e, $id)}
                                defaultValue={Status}
                              >
                                <option value="Delivered">Delivered</option>
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Cancel">Cancel</option>
                              </select>
                            </td>
                          </tr>
                        );
                      }
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
}

export default OrdersView;
