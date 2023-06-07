import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/toggleSwitch.css";
import {
  updateCategory,
  getCategories,
  login,
  getUserData,
  addCategoryImage,
  getParentCategories,
} from "../actions";

const UpdateCategoryScreen = ({ setShow, show, catData }) => {
  const [categoryData, setcategoryData] = useState({
    name: catData.name,
    desc: catData.desc,
    image: catData.image,
    parent: catData.parent,
    published: catData.published,
    bucketId: catData.bucketId,
    fileId: catData.fileId,
  });

  const [files, setFiles] = useState();
  const [thumbnail, setThumbnail] = useState("");
  const [uploading, setUploading] = useState(false);

  const [parentList, setParentCat] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    getUserData()
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e.message);
      });
    getParentList();
  }, []);

  /* useEffect(() => {
    loginHandler();
  }, []); */

  const getParentList = async () => {
    const parentCategories = await getParentCategories()
      .then((response) => {
        console.log(response);
        setParentCat(response.documents);
      })
      .catch((e) => console.log(e.message));
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files.length > 0) {
      setFiles(files[0]);
      const reader = new FileReader();
      if (files[0] && files[0].type.match("image.*")) {
        reader.onload = (event) => {
          setThumbnail(event.target.result);
        };
        reader.readAsDataURL(event.dataTransfer.files[0]);
      }
    }

    console.log("files", files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileSelect = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFiles(selectedFile);

    const reader = new FileReader();
    if (selectedFile && selectedFile.type.match("image.*")) {
      reader.onload = (event) => {
        setThumbnail(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /*  const loginHandler = async () => {
    await login('karandua2002@gmail.com', 'newaccount@100')
      .then(() => console.log('logged in'))
      .catch((err) => console.log(err));
  }; */

  const handleAddCategory = async () => {
    setUploading(true);
    try {
      let urlImage = categoryData.image;
      let urlData = {
        $id: categoryData.fileId,
        bucketId: categoryData.bucketId,
      };

      console.log("files ", files);

      if (files !== null && files !== undefined) {
        urlData = await addCategoryImage(files);
        urlImage = `https://appwrite.techsouqdubai.com/v1/storage/buckets/${urlData.bucketId}/files/${urlData.$id}/view?project=646339a61beac87efd09`;
        console.log("image", urlImage);
        setcategoryData({ ...categoryData, image: urlImage });
      }

      console.log("data", urlData);
      await updateCategory(
        {
          name: categoryData.name,
          desc: categoryData.desc,
          image: urlImage,
          parent: categoryData.parent,
          published: categoryData.published,
          fileId: urlData.$id,
          bucketId: urlData.bucketId,
        },
        catData.$id
      ).then(() => {
        console.log("category created");
        setShow(false);
      });
    } catch (error) {
      console.log(error);
    }
    setUploading(false);
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className=" bg-gray-800 flex z-40 shadow-inner  flex-col w-full fixed overflow-auto"
      style={{ height: "100svh" }}
    >
      <div className="flex justify-between items-center py-6 px-3 bg-gray-900">
        <div className="flex flex-col mr-2 text-gray-300 ">
          <p className="font-semibold">Update Category</p>
          <p className="text-xs text-gray-300">
            Upadate your Product category and necessary information from here
          </p>
        </div>
        <button
          className="rounded-full shadow-xl p-2 w-[30px] h-[30px]  bg-white text-red-500 text-sm flex justify-center items-center"
          onClick={() => setShow(!show)}
        >
          <CloseIcon style={{ width: "20px", height: "20px" }} />
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  justify-evenly px-3 py-6 bg-gray-900 gap-x-6 gap-y-3 z-50">
        <button
          className="bg-gray-700 col-span-1  py-2 w-full rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-700 font-semibold  border border-gray-700"
          onClick={() => setShow(!show)}
        >
          Cancel
        </button>
        <button
          className={
            uploading
              ? "bg-green-400 col-span-1   py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold cursor-not-allowed disabled"
              : "bg-green-400 col-span-1   py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold "
          }
          onClick={() => handleAddCategory()}
        >
          Update Category
        </button>
      </div>

      <div className="overflow-y-auto pb-40 bg-gray-800 scrollbar-hide">
        <form>
          {/* Title */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">Name</p>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <input
                onChange={(e) =>
                  setcategoryData({
                    ...categoryData,
                    name: e.target.value,
                  })
                }
                type="text"
                name=""
                id=""
                value={categoryData.name}
                placeholder="Category title"
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none "
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">
                Description
              </p>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <textarea
                onChange={(e) =>
                  setcategoryData({
                    ...categoryData,
                    desc: e.target.value,
                  })
                }
                type="text"
                name="description"
                rows="4"
                value={categoryData.desc}
                spellCheck={false}
                id=""
                placeholder="Category Description"
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none "
              />
            </div>
          </div>

          {/* Select Parent Category */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">
                Parent Category
              </p>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <select
                onChange={(e) =>
                  setcategoryData({
                    ...categoryData,
                    parent: e.target.value,
                  })
                }
                name=""
                id=""
                value={categoryData.parent}
                placeholder="Select Parent"
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none "
              >
                <option value="" disabled selected hidden>
                  Select Parent
                </option>

                <option value="isParent">Set as Parent Category</option>
                {parentList.map((val, index) => (
                  <option value={`${val.$id}&&${val.name}`} key={index}>
                    {val.name}
                  </option>
                ))}
                {/*  <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option> */}
              </select>
            </div>
          </div>

          {/* Image */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0">
                Category Image
              </p>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div className="w-full text-center">
                <div
                  className="border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer px-6 pt-5 pb-6"
                  role="button"
                  tabindex="0"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={handleDivClick}
                >
                  <input
                    onChange={handleFileSelect}
                    accept="image/*"
                    multiple=""
                    type="file"
                    autocomplete="off"
                    ref={fileInputRef}
                    id="fileInput"
                    tabindex="-1"
                    style={{ display: "none" }}
                  />
                  <span className="mx-auto flex justify-center">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="text-3xl text-green-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="16 16 12 12 8 16"></polyline>
                      <line x1="12" y1="12" x2="12" y2="21"></line>
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                      <polyline points="16 16 12 12 8 16"></polyline>
                    </svg>
                  </span>
                  <p className="text-sm mt-2">Drag your image here</p>
                  <em className="text-xs text-gray-400">
                    (Only *.jpeg, *.webp and *.png image will be accepted)
                  </em>
                </div>
                {files || categoryData.image !== null ? (
                  <div className="flex w-full justify-center flex-col items-center mt-3 ">
                    {/* <p>Selected file: {files.name}</p>
                    <p>File size: {files.size} bytes</p> */}

                    <div className="relative w-3/4">
                      {thumbnail && (
                        <button
                          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white text-red-500 "
                          onClick={() => {
                            setFiles();
                            setThumbnail();
                          }}
                        >
                          <CloseIcon color="red" />
                        </button>
                      )}
                      <img
                        src={thumbnail || categoryData.image}
                        alt="Thumbnail"
                        className=" object-contain rounded-md"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="text-green-500"></div>
                <aside className="flex flex-row flex-wrap mt-4"></aside>
              </div>
            </div>
          </div>

          {/* Published */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 ">
                Published
              </p>
            </div>

            <div
              className="col-span-1 lg:col-span-3 xl:col-span-3 px-2 relative cursor-pointer"
              onClick={() =>
                setcategoryData({
                  ...categoryData,
                  published: !categoryData.published,
                })
              }
            >
              <input
                type="checkbox"
                checked={categoryData.published}
                class="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[13px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryScreen;
