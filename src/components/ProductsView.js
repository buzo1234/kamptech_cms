import React from 'react';

function ProductsView({ allProducts }) {
  return (
    <>
      <div className='w-full overflow-hidden border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto'>
        <table className='w-full whitespace-nowrap'>
          <thead className='text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800'>
            <tr>
              <td className='px-4 py-3 w-[1/8]'>Image</td>
              <td className='px-4 py-3 w-[1/8]'>Product Name</td>
              <td className='px-4 py-3 w-[1/8]'>Qty</td>
              <td className='px-4 py-3 w-[1/8]'>Tags</td>
              <td className='px-4 py-3 w-[1/8]'>Category</td>
              <td className='px-4 py-3 w-[1/8]'>Published</td>
              <td className='px-4 py-3 w-[1/8]'>Sale Price</td>
              <td className='px-4 py-3 w-[1/8]'>Cost Price</td>
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
                  <td className='px-4 py-3 '>
                    <img
                      src={images[0]}
                      className='w-[50px] h-[50px] object-contain'
                    />
                  </td>
                  <td className='px-4 py-3 '>{title}</td>
                  <td className='px-4 py-3 '>{quantity}</td>
                  {/* tags should be mapped */}
                  <td className='px-4 py-3 '>{tags}</td>
                  <td className='px-4 py-3 '>{category?.name}</td>
                  <td className='px-4 py-3 '>{published.toString()}</td>
                  <td className='px-4 py-3 '>{salePrice}</td>
                  <td className='px-4 py-3 '>{costPrice}</td>
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
