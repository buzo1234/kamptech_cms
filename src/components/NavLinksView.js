import React, { useEffect, useState } from 'react';
import '../styles/toggleSwitch.css';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';

const NavLinksView = ({
  catList,
  setEditId,
  setShow,
  show,
  setDeleteId,
  setDelShow,
  delShow,
}) => {
  const handleEditClick = (catData) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setEditId(catData);
    setShow(!show);
  };

  const handleDeleteClick = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setDeleteId(id);
    setDelShow(!delShow);
  };
  return (
    <div>
      {catList ? (
        <div className='w-full overflow-hidden border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto'>
          <table className='w-full whitespace-nowrap'>
            <thead className='text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-primary'>
              <tr>
                <td className='px-4 py-3'>Name</td>
                <td className='px-4 py-3'>Grouped Categories</td>
                <td className='px-4 py-3'>Actions</td>
              </tr>
            </thead>
            <tbody>
              {catList?.map(
                (
                  { name, categories, $id },
                  index
                ) => (
                  <tr key={$id}>
                    
                    <td className='px-4 py-3'>{name}</td>
                    <td><div className='w-full flex flex-wrap gap-2'>{categories.map((cat) => <div className='bg-black text-white px-3 py-1 rounded-md'>{cat.name}</div>)}</div></td>
                    <td className='px-4 py-3 '>
                      <div className='flex justify-evenly w-full'>
                        <button
                          className='mr-2'
                          onClick={() => handleEditClick(catList[index])}
                        >
                          <BorderColorSharpIcon
                            className='hover:text-green-600'
                            style={{ width: '19px', height: '19px' }}
                          />
                        </button>
                        <button
                          className='mr-2'
                          onClick={() => handleDeleteClick($id)}
                        >
                          <DeleteOutlineSharpIcon
                            className='hover:text-red-600'
                            style={{ width: '19px', height: '19px' }}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No NavLinks added yet</div>
      )}
    </div>
  );
};

export default NavLinksView;
