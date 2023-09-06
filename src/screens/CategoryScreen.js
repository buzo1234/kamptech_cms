import React, { useEffect, useState } from 'react';
import AddCategoryScreen from '../components/AddCategoryScreen';
import { getCategories, getCategoryRelations } from '../actions';
import CategoriesView from '../components/CategoriesView';
import UpdateCategoryScreen from '../components/UpdateCategoryScreen';
import DeleteCategoryScreen from '../components/DeleteCategoryScreen';
import { CSVLink } from 'react-csv';

const CategoryScreen = () => {
  const [addCat, setAddCat] = useState(false);
  const [categories, setCategories] = useState([]);

  const [relations, setRelations] = useState([]);

  const [editCat, setEditCat] = useState(false);
  const [editCatData, setEditCatData] = useState();

  const [deleteBox, setDeleteBox] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const categoryHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Description', key: 'desc' },
    { label: 'Published', key: 'published' },
    { label: 'Icon', key: 'image' },
    { label: 'Parent Category', key: 'parent' },
  ];

  useEffect(() => {
    if (addCat || editCat || deleteBox) {
      document.body.style.overflow = 'hidden';
      //document.getElementById("mainbody").style.overflow = "hidden";
      console.log('hidden');
    } else {
      document.body.style.overflow = 'auto';
      //document.getElementById("mainbody").style.overflow = "auto";
    }
  }, [addCat, editCat, deleteBox]);

  useEffect(() => {
    /* getCatData();
    getRelData(); */
    getCatDataWithRelations();
  }, [addCat, editCat, deleteBox]);

  /* const getRelData = async () => {
    try {
      await getCategoryRelations()
        .then((response) => setRelations(response.documents))
        .catch((err) => console.log(err.message));
    } catch (e) {
      console.log(e.message);
    }
  }; */

  const getCatDataWithRelations = async () => {
    try {
      await getCategories()
        .then((response) => {
            const categoryDocs = response.documents;
            getCategoryRelations().then((relationResponses) => {
              const relations = relationResponses.documents;
              
              const categoryWithRelations = categoryDocs.map((category) => {
                const categoryRelations = relations.filter((relation) => relation?.child?.$id === category.$id);

                return {
                  ...category,
                  newParent: categoryRelations,
                }
              });


              setCategories(categoryWithRelations);
            })
        })
        .catch((err) => console.log(err.message));
    } catch (e) {
      console.log(e.message);
    }
  };

  /* const getCatData = async () => {
    console.log('here');
    try {
      await getCategories()
        .then((response) => setCategories(response.documents))
        .catch((err) => console.log(err.message));
    } catch (e) {
      console.log(e.message);
    }
  }; */

  return (
    <>
      <div
        class={'relative z-20' + (addCat ? ' overflow-none' : '')}
        id='mainbody'
      >
        <p className='font-bold pb-3   text-2xl '>Category</p>
        <div className='bg-primary px-3 shadow-xs rounded-lg ring-1 ring-black ring-opacity-10 py-4'>
          <form className='items-center justify-center grid grid-cols-2 gap-y-3'>
            <div className='col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1'>
              <CSVLink
                data={categories.map((category) => ({
                  ...category,
                  parent: category.parent.split('&&')[1],
                }))}
                headers={categoryHeaders}
                filename={'TechSouqDubai Categories List'}
                target='_blank'
                class='border flex justify-center items-center border-white hover:border-green-400 hover:text-green-400  dark:text-white cursor-pointer h-10 w-20 rounded-md focus:outline-none'
                fdprocessedid='k2ha3j'
              >
                <svg
                  stroke='currentColor'
                  fill='none'
                  stroke-width='2'
                  viewBox='0 0 24 24'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  class='mr-2'
                  height='1em'
                  width='1em'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'></path>
                  <polyline points='17 8 12 3 7 8'></polyline>
                  <line x1='12' y1='3' x2='12' y2='15'></line>
                </svg>
                <span class='text-xs '>Export</span>
              </CSVLink>
            </div>

            <div className='col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 flex w-full justify-end'>
              <div className='w-full md:w-48 lg:w-48 xl:w-48'>
                <button
                  className='align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 text-sm text-white bg-green-700 border border-transparent active:bg-green-600 focus:ring focus:ring-purple-300 w-full rounded-md h-12'
                  type='button'
                  fdprocessedid='3w9l4i'
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });

                    setAddCat(!addCat);
                    console.log(addCat);
                  }}
                >
                  <span class='mr-2'>
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
                      <line x1='12' y1='5' x2='12' y2='19'></line>
                      <line x1='5' y1='12' x2='19' y2='12'></line>
                    </svg>
                  </span>
                  Add Category
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Show Categories */}
        <div className='my-6'>
          <CategoriesView
            catList={categories}
            relList={relations}
            setEditId={setEditCatData}
            setShow={setEditCat}
            show={editCat}
            setDeleteId={setDeleteId}
            delShow={deleteBox}
            setDelShow={setDeleteBox}
          />
        </div>
      </div>

      {/* Add Category Screen */}
      {addCat && (
        <>
          <div className='absolute w-full h-full z-[100] top-0 left-0 bg-black/30 '></div>

          <div
            className='absolute right-0 overflow-auto   z-[200] top-0 6 w-full lg:w-2/3 xl:w-2/3 bg-white transform -translate-x-0 transition duration-300 ease-in-out '
            style={{ minHeight: '100svh', overflow: 'auto' }}
          >
            <AddCategoryScreen setShow={setAddCat} show={addCat} />
          </div>
        </>
      )}

      {/* Edit Category Screen */}
      {editCat && (
        <>
          <div className='absolute w-full h-full z-[100] top-0 left-0 bg-black/30 '></div>

          <div
            className='absolute right-0 overflow-auto   z-[200] top-0 6 w-full lg:w-2/3 xl:w-2/3 bg-white transform -translate-x-0 transition duration-300 ease-in-out '
            style={{ minHeight: '100svh', overflow: 'auto' }}
          >
            <UpdateCategoryScreen
              setShow={setEditCat}
              show={editCat}
              catData={editCatData}
            />
          </div>
        </>
      )}

      {/* Delete Category Screen */}
      {deleteBox && (
        <>
          <div className='absolute w-full h-full z-[100] top-0 left-0 bg-black/30 '></div>

          <div
            className='absolute  overflow-auto top-0 left-0  z-[200]  w-full h-full bg-transparent flex justify-center items-center mx-auto  '
            style={{ overflow: 'auto' }}
          >
            <DeleteCategoryScreen
              setShow={setDeleteBox}
              show={deleteBox}
              catId={deleteId}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CategoryScreen;
