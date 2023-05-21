import React from "react";

function ProductsView({ allProducts }) {
  return (
    <>
      <div className="rounded-md w-full overflow-x-auto mt-8">
        <table className="border-0 border-white border-solid  whitespace-nowrap w-full">
          <thead className="text-xs font-semibold text-left uppercase border-gray-700 text-gray-400 bg-gray-800">
            <tr>
              <td className="px-4 py-3 w-[1/8]">Image</td>
              <td className="px-4 py-3 w-[1/8]">Product Name</td>
              <td className="px-4 py-3 w-[1/8]">Qty</td>
              <td className="px-4 py-3 w-[1/8]">Tags</td>
              <td className="px-4 py-3 w-[1/8]">Category</td>
              <td className="px-4 py-3 w-[1/8]">Published</td>
              <td className="px-4 py-3 w-[1/8]">Sale Price</td>
              <td className="px-4 py-3 w-[1/8]">Cost Price</td>
            </tr>
          </thead>
          <tbody>
            {allProducts?.map(
              ({
                $id,
                title,
                images,
                modelName,
                modelNumber,
                description,
                tags,
                quantity,
                salePrice,
                category,
                published,
                costPrice,
              }) => (
                <tr key={$id}>
                  <td className="px-4 py-3 w-[1/9]">{images[0]}</td>
                  <td className="px-4 py-3 w-[1/9]">{title}</td>
                  <td className="px-4 py-3 w-[1/9]">{quantity}</td>
                  {/* tags should be mapped */}
                  <td className="px-4 py-3 w-[1/9]">{tags}</td>
                  <td className="px-4 py-3 w-[1/9]">{category.name}</td>
                  <td className="px-4 py-3 w-[1/9]">{published}</td>
                  <td className="px-4 py-3 w-[1/9]">{salePrice}</td>
                  <td className="px-4 py-3 w-[1/9]">{costPrice}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductsView;
