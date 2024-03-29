import React from "react";
import "../styles/toggleSwitch.css";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";

function ProductsView({
  allProducts,
  filter,
  setEditId,
  setShow,
  show,
  setDeleteId,
  setDelShow,
  delShow,
  currency: defCurrency,
}) {
  const conversionRate = 3.67;
  const handleEditClick = (prodData) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setEditId(prodData);
    setShow(!show);
  };

  const handleDeleteClick = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setDeleteId(id);
    setDelShow(!delShow);
  };

  return (
    <>
      <div className="w-full overflow-hidden border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
            <tr>
              <td className="px-4 py-3">Icon</td>
              <td className="px-4 py-3">Name</td>

              <td className="px-4 py-3">Category</td>
              <td className="px-4 py-3">SKU</td>
              <td className="px-4 py-3">Cost Price</td>
              <td className="px-4 py-3">Sale Price</td>
              <td className="px-4 py-3">Qty</td>
              <td className="px-4 py-3">Qty Last Updated</td>
              <td className="px-4 py-3">Status</td>
              <td className="px-4 py-3">Published</td>
              <td className="px-4 py-3">Actions</td>
            </tr>
          </thead>
          <tbody>
            {filter.map(
              (
                {
                  $id,
                  title,
                  images,
                  description,
                  sku,
                  quantity,
                  salePrice,
                  category,
                  published,
                  costPrice,
                  currency,
                  quantityUpdate,
                },
                index
              ) => {
                let lastUpdatedDate = new Date(
                  JSON.parse(quantityUpdate.slice(-1)[0]).date
                );
                const day = lastUpdatedDate.getDate();
                const month = lastUpdatedDate.getMonth() + 1;
                const year = lastUpdatedDate.getFullYear();
                const hours = lastUpdatedDate.getHours();
                const mins = lastUpdatedDate.getMinutes();
                return (
                  <tr key={$id}>
                    <td className="px-4 py-3 ">
                      <img
                        src={images[0]}
                        className="w-[50px] h-[50px] object-contain"
                      />
                    </td>
                    <td className="px-4 py-3 ">{title}</td>

                    <td className="px-4 py-3 ">
                      {category?.name || "No Category Assigned"}
                    </td>

                    <td className="px-4 py-3 ">{sku}</td>
                    <td className="px-4 py-3 ">
                      {defCurrency === "usd" ? "$" : "AED "}
                      {defCurrency === currency
                        ? costPrice
                        : defCurrency === "aed"
                        ? (costPrice * conversionRate).toFixed(2)
                        : (costPrice / conversionRate).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 ">
                      {defCurrency === "usd" ? "$" : "AED "}
                      {defCurrency === currency
                        ? salePrice
                        : defCurrency === "aed"
                        ? (salePrice * conversionRate).toFixed(2)
                        : (salePrice / conversionRate).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 ">{quantity}</td>
                    <td className="px-4 py-3 ">{`${
                      day < 10 ? "0" + day : day
                    }/${month < 10 ? "0" + month : month}/${year} - ${
                      hours < 10 ? "0" + hours : hours
                    }:${mins < 10 ? "0" + mins : mins}`}</td>
                    <td className="px-4 py-3 ">
                      {quantity > 0 ? (
                        <span className="bg-green-700 px-2 py-[0.5] rounded-lg text-sm">
                          Selling
                        </span>
                      ) : (
                        <span className="bg-red-700 px-2 py-[0.5] rounded-lg text-sm">
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 ">
                      <input
                        type="checkbox"
                        checked={published}
                        className="w-5 h-5 rounded-lg bg-green-600"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-evenly w-full">
                        <button
                          className="mr-2"
                          onClick={() => handleEditClick(allProducts[index])}
                        >
                          <BorderColorSharpIcon
                            className="hover:text-green-600"
                            style={{ width: "19px", height: "19px" }}
                          />
                        </button>
                        <button
                          className="mr-2"
                          onClick={() => handleDeleteClick($id)}
                        >
                          <DeleteOutlineSharpIcon
                            className="hover:text-red-600"
                            style={{ width: "19px", height: "19px" }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsView;
