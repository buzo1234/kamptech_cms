import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { uploadProductFilesToBucket, createProduct } from "../actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductScreen({ formState, categories }) {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    sku: "",
    quantity: 0,
    salePrice: 0.0,
    costPrice: 0.0,
    specifications: [],
    tags: [],
    category: "",
    images: [],
    published: false,
    currency: "",
    serial: [],
    invoice: [],
    quantityUpdate: [],
  });

  //console.log("HERE",categories)

  /* const [desc, setDesc] = useState('');
  console.log(desc) */

  const [currentTag, setCurrentTag] = useState("");

  const [rowCount, setRowCount] = useState(0);

  const [specification, setSpecification] = useState([]);

  const [uploading, setUploading] = useState(false);
  const [currency, setCurrency] = useState("usd");

  /* Files */
  const [selectedfiles, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setFiles([...selectedfiles, ...files]);
    getThumbnails();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setFiles([...selectedfiles, ...files]);
    getThumbnails();
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  /* Thumbnails */
  const getThumbnails = async () => {
    const thumbnailPromises = selectedfiles.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const thumbnailSrc = event.target.result;
          resolve(thumbnailSrc);
        };
        reader.onerror = (event) => {
          reject(event.target.error);
        };
        reader.readAsDataURL(file);
      });
    });

    try {
      const thumbnailResults = await Promise.all(thumbnailPromises);
      setThumbnails(thumbnailResults);
    } catch (error) {
      console.error("Error generating thumbnails:", error);
    }
  };

  const handleRemoveFile = (index, e) => {
    e.preventDefault();
    const updatedFiles = selectedfiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const renderThumbs = () => {
    return thumbnails.map((thumb, index) => (
      <div className="relative ">
        <button
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white text-red-500 "
          onClick={(e) => handleRemoveFile(index, e)}
        >
          <CloseIcon color="red" />
        </button>
        <img src={thumb} className="w-[250px] object-contain" />
      </div>
    ));
  };

  useEffect(() => {
    getThumbnails();
  }, [selectedfiles]);

  /* ------------------------------ */

  const [serial, setSerial] = useState("");
  const [invoice, setInvoice] = useState("");

  const handleTagRemove = (event, index, type) => {
    switch (type) {
      case "serial":
        const updatedSerial = [...productData.serial];
        updatedSerial.splice(index, 1);
        setProductData({ ...productData, serial: updatedSerial });
        break;
      case "invoice":
        const updatedInvoice = [...productData.invoice];
        updatedInvoice.splice(index, 1);
        setProductData({ ...productData, invoice: updatedInvoice });
        break;
      default:
        const updatedTags = [...productData.tags];
        updatedTags.splice(index, 1);
        setProductData({ ...productData, tags: updatedTags });
    }
  };

  const handleTagInput = (event, type = "tag") => {
    if (event.key === "Enter") {
      event.preventDefault();
      switch (type) {
        case "serial":
          if (serial.trim() !== "") {
            setProductData({
              ...productData,
              serial: [...productData.serial, serial.trim()],
            });
          }
          setSerial("");
          break;
        case "invoice":
          if (invoice.trim() !== "") {
            setProductData({
              ...productData,
              invoice: [...productData.invoice, invoice.trim()],
            });
          }
          setInvoice("");
          break;
        default:
          if (currentTag.trim() !== "" && productData.tags.length < 5) {
            setProductData({
              ...productData,
              tags: [...productData.tags, currentTag.trim()],
            });
            setCurrentTag("");
          }
      }
    }
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...specification];
    updatedRows[index][field] = value;
    setSpecification(updatedRows);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = [...specification];
    updatedRows.splice(index, 1);

    setSpecification(updatedRows);
  };

  const handleAddSpecifications = (e) => {
    e.preventDefault();
    var newSpecs = JSON.parse(JSON.stringify(specification));
    setProductData({ ...productData, specifications: newSpecs });
  };

  let formComplete = true;
  const onProductFormSubmit = async (e) => {
    e.preventDefault();
    if (productData.title === "") {
      formComplete = false;
      toast.error("Please enter product title");
    } else if (productData.sku === "") {
      formComplete = false;
      toast.error("Please enter product sku");
    } else if (productData.category === "") {
      formComplete = false;
      toast.error("Please assign product category");
    } else if (selectedfiles.length === 0) {
      formComplete = false;
      toast.error("Please add atlease one image");
    } else if (productData.quantity < 0) {
      formComplete = false;
      toast.error("Please enter product quantity");
    } else if (productData.salePrice < 0) {
      formComplete = false;
      toast.error("Please enter sale price");
    } else if (productData.costPrice < 0) {
      formComplete = false;
      toast.error("Please enter cost price");
    } else {
      try {
        setUploading(true);
        if (formComplete) {
          var specs = [];
          for (const spec of productData.specifications) {
            specs.push(JSON.stringify(spec));
          }
          const imagesData = await uploadProductFilesToBucket(selectedfiles);
          setProductData({ ...productData, images: imagesData });

          const quantityUpdate = [];
          if (productData.quantity >= 0) {
            quantityUpdate.push(
              JSON.stringify({
                date: new Date(),
                quantityBefore: 0,
                quantityAfter: productData.quantity,
              })
            );
          }

          await createProduct({
            title: productData.title,
            description: productData.description,
            sku: productData.sku,
            salePrice: productData.salePrice,
            costPrice: productData.costPrice,
            quantity: productData.quantity,
            tags: productData.tags,
            images: imagesData.urls,
            fileId: imagesData.ids,
            category: productData.category,
            specifications: specs,
            published: productData.published,
            currency,
            serial: productData.serial,
            invoice: productData.invoice,
            quantityUpdate: quantityUpdate,
          }).then(() => {
            console.log("product added");
            setUploading(false);
            formState(false);
          });
          toast.success("Product successfully added");
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  function setDescription(val) {
    setProductData({ ...productData, description: val });
  }

  /* category options */
  const categoryMap = {};

  categories.forEach((category) => {
    const parentId = category.parent;

    if (parentId === "isParent") {
      //console.log(category.name)
      // Category itself is a parent
      if (!categoryMap["isParent"]) {
        categoryMap["isParent"] = [];
      }
      categoryMap['isParent'].push(category);
    } else {
      // Category has a valid parent ID
      if (!categoryMap[parentId.split("&&")[0]]) {
        categoryMap[parentId.split("&&")[0]] = [];
      }
      categoryMap[parentId.split("&&")[0]].push(category);
    }
  });

  console.log(categoryMap)

  function generateOptions(categoryMap, parentId = 'isParent', level = 0) {
    //console.log(categoryMap)
    const options = [];

    const children = categoryMap[parentId];

    if (children) {
      children.forEach((child) => {
        const indent = Array(level).fill("\xa0-").join(""); // Use non-breaking spaces for indentation

        options.push(
          <option key={child.$id} value={child.$id}>
            {indent}
            {child.name}
          </option>
        );

        const grandchildren = generateOptions(
          categoryMap,
          child.$id,
          level + 1
        );
        options.push(...grandchildren);
      });
    }

    return options;
  }

  return (
    <div
      className="bg-gray-800 flex z-40 shadow-inner flex-col w-full fixed overflow-auto"
      style={{ height: "100svh" }}
    >
      <ToastContainer />
      <div className="flex justify-between items-center py-6 px-3 bg-gray-900">
        <div className="flex flex-col mr-2 text-gray-300 ">
          <p className="font-semibold">Add Product</p>
          <p className="text-xs text-gray-300">
            Add your product and necessary information from here
          </p>
        </div>
        <button
          className="rounded-full shadow-xl p-2 w-[30px] h-[30px]  bg-white text-red-500 text-sm flex justify-center items-center"
          onClick={() => formState(false)}
        >
          <CloseIcon style={{ width: "20px", height: "20px" }} />
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  justify-evenly px-3 py-6 bg-gray-900 gap-x-6 gap-y-3 z-50">
        <button
          className="bg-gray-700 col-span-1  py-2 w-full rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-700 font-semibold  border border-gray-700"
          onClick={() => formState(false)}
        >
          Cancel
        </button>
        <button
          onClick={onProductFormSubmit}
          className={
            uploading
              ? "bg-green-400 col-span-1 py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold cursor-not-allowed disabled"
              : "bg-green-400 col-span-1 py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold "
          }
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </div>

      <div className="overflow-y-auto pb-40 bg-gray-800 md:px-4 scrollbar-hide">
        <form>
          {/* Title */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Title
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <input
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none "
                type="text"
                name="title"
                placeholder="Product Title/Name"
                onChange={(e) =>
                  setProductData({ ...productData, title: e.target.value })
                }
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Description
              </label>
            </div>

            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              {/*  <textarea
                className='block p-3 w-full text-sm px-3 py-1 text-gray-300 rounded-md focus:outline-none form-textarea  border-gray-600 focus:border-gray-500 bg-gray-700 focus:ring-gray-700 focus:ring  border  border-transparent'
                name='description'
                placeholder='Product Description'
                rows='4'
                spellCheck={true}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value,
                  })
                }
              ></textarea> */}
              <ReactQuill
                name="description"
                modules={modules}
                formats={formats}
                theme="snow"
                value={productData.description}
                className="text-black border-none max-h-[400px] overflow-y-auto"
                onChange={setDescription}
                style={{ backgroundColor: "white" }}
              />
              {/* <div className='h-[500px] w-full'></div> */}
            </div>
          </div>

          {/* SKU */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                SKU
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <input
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none "
                type="text"
                name="title"
                placeholder="Product SKU"
                onChange={(e) =>
                  setProductData({ ...productData, sku: e.target.value })
                }
              />
            </div>
          </div>

          {/* Images */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Images
              </label>
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
                    multiple={true}
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

                {selectedfiles.length > 0 ? (
                  <div className="flex flex-wrap w-full justify-center space-x-3 space-y-2 items-center mt-3">
                    {renderThumbs()}
                  </div>
                ) : (
                  ""
                )}

                <div className="text-green-500"></div>
                <aside className="flex flex-row flex-wrap mt-4"></aside>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Select Category
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <select
                name=""
                id=""
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                onChange={(e) =>
                  setProductData({ ...productData, category: e.target.value })
                }
              >
                <option disabled selected hidden>
                  Select Category
                </option>
                {/* {categories?.map((category, index) => (
                  <option value={category.$id}>{category.name}</option>
                ))} */}
                {generateOptions(categoryMap)}
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Price
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div className="flex flex-row">
                <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm focus:border-green-300 dark:bg-gray-700 dark:text-gray-300 dark:border dark:border-gray-600">
                  <select
                    className="bg-gray-700 border-none text-md text-gray-300 cursor-pointer appearance-none shadow-sm focus:outline-none"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="usd">USD</option>
                    <option value="aed">AED</option>
                  </select>
                </span>
                <input
                  className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none rounded-l-none "
                  type="number"
                  name="originalPrice"
                  placeholder="Original Price"
                  step="0.01"
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      costPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Sale Price */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Sale Price
              </label>
            </div>

            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div className="flex flex-row">
                <span className="inline-flex items-center px-3 rounded rounded-r-none border border-r-0 border-gray-300 bg-gray-50 text-sm focus:border-green-300 dark:bg-gray-700 text-gray-300 dark:border dark:border-gray-600">
                  <select
                    className="bg-gray-700 border-none rounded-md text-gray-300 cursor-pointer appearance-none shadow-sm focus:outline-none"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="usd">USD</option>
                    <option value="aed">AED</option>
                  </select>
                </span>
                <input
                  className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none rounded-l-none "
                  type="number"
                  name="price"
                  placeholder="Sale price"
                  step="0.01"
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      salePrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Product Quantity */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Quantity
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <input
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                type="number"
                name="quantity"
                onChange={(e) =>
                  setProductData({ ...productData, quantity: e.target.value })
                }
                placeholder="Product Quantity"
              />
            </div>
          </div>

          {/* Product Tags */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Tags
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div>
                <input
                  type="text"
                  className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                  placeholder="Add Unique Product Tags (enter a tag and then press enter, max 5 allowed)"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    handleTagInput(e);
                  }}
                />
              </div>
              <div className="flex mt-2 mb-2">
                {productData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="border-1 bg-green-700 border-white rounded-md border-solid  flex items-center justify-between px-2 py-1 mr-2"
                  >
                    <p>{tag}</p>
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={(e) => {
                        handleTagRemove(e, index);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Serial */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Serial Numbers
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div>
                <input
                  type="text"
                  className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                  placeholder="Add Serial Numbers"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  onKeyDown={(e) => {
                    handleTagInput(e, "serial");
                  }}
                />
              </div>
              <div className="flex mt-2 mb-2">
                {productData.serial.map((serialTag, index) => (
                  <div
                    key={index}
                    className="border-1 bg-green-700 border-white rounded-md border-solid  flex items-center justify-between px-2 py-1 mr-2"
                  >
                    <p>{serialTag}</p>
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={(e) => {
                        handleTagRemove(e, index, "serial");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Invoice */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Product Invoice Numbers
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div>
                <input
                  type="text"
                  className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                  placeholder="Add Invoice Numbers"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  onKeyDown={(e) => {
                    handleTagInput(e, "invoice");
                  }}
                />
              </div>
              <div className="flex mt-2 mb-2">
                {productData.invoice.map((inv, index) => (
                  <div
                    key={index}
                    className="border-1 bg-green-700 border-white rounded-md border-solid  flex items-center justify-between px-2 py-1 mr-2"
                  >
                    <p>{inv}</p>
                    <CloseIcon
                      className="cursor-pointer"
                      onClick={(e) => {
                        handleTagRemove(e, index, "invoice");
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Specifications
              </label>
            </div>

            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <div className="flex w-full items-center mb-4 space-x-2">
                <div
                  className="border-0 border-white border-solid px-4 py-2 bg-gray-600 rounded-md cursor-pointer "
                  onClick={(e) => {
                    e.preventDefault();
                    setSpecification([
                      ...specification,
                      { key: "", value: "" },
                    ]);
                  }}
                >
                  + Add Row
                </div>
                <button
                  onClick={handleAddSpecifications}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Done
                </button>
              </div>
              <div className="flex flex-col w-full overflow-auto">
                {specification.map((spec, index) => (
                  <div className="flex mb-2 items-center space-x-3" key={index}>
                    <input
                      type="text"
                      placeholder="key"
                      className="block px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-500 bg-gray-700 border h-12 border-transparent col-span-2"
                      onChange={(e) =>
                        handleRowChange(index, "key", e.target.value)
                      }
                      value={spec.key}
                    />
                    <input
                      type="text"
                      placeholder="value"
                      className="block px-3 py-1 text-sm focus:outline-none focus:border-gray-200 bg-gray-700 dark:text-gray-300 leading-5 rounded-md border h-12 border-transparent col-span-2"
                      onChange={(e) =>
                        handleRowChange(index, "value", e.target.value)
                      }
                      value={spec.value}
                    />
                    <CloseIcon
                      onClick={() => handleRemoveRow(index)}
                      className="cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Added Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-4">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Added Specifications
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              {productData.specifications.length > 0 ? (
                <div className="w-full flex  border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto">
                  <table className="w-full whitespace-nowrap">
                    {productData.specifications.map((spec) => (
                      <tr className="grid grid-cols-2 w-full text-gray-300 border border-gray-700 ring-1 ring-black ring-opacity-5">
                        <td className="col-span-1 px-4 py-3 border border-gray-700 ring-1 ring-black ring-opacity-5 ">
                          <p className="text-ellipsis w-full overflow-hidden">
                            {spec.key}
                          </p>
                        </td>
                        <td className="col-span-1 px-4 py-3 border border-gray-700 ring-1 ring-black ring-opacity-5">
                          <p className="text-ellipsis w-full overflow-hidden">
                            {spec.value}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              ) : (
                <p className="text-gray-300 text-sm col-span-4">
                  No Specifications mentioned
                </p>
              )}
            </div>
          </div>

          {/* Published */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Published
              </p>
            </div>

            <div
              className="col-span-1 lg:col-span-3 xl:col-span-3 px-2 relative cursor-pointer"
              onClick={() =>
                setProductData({
                  ...productData,
                  published: !productData.published,
                })
              }
            >
              <input
                type="checkbox"
                checked={productData.published}
                class="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[13px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductScreen;
