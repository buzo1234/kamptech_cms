import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  uploadProductFilesToBucket,
  updateProduct,
  deleteFiles,
} from "../actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";

function EditProductScreen({ setShow, show, prodData, categories, skus }) {
  const [productData, setProductData] = useState({
    title: prodData.title,
    description: prodData.description,
    sku: prodData.sku.trim(),
    quantity: prodData.quantity,
    contactForPrice: prodData.contactForPrice,
    salePrice: prodData.salePrice,
    costPrice: prodData.costPrice,
    specifications: [],
    tags: prodData.tags,
    category: prodData.category || "",
    images: prodData.images,
    published: prodData.published,
    fileId: prodData.fileId,
    currency: prodData.currency,
    serial: prodData.serial,
    invoice: prodData.invoice,
    quantityUpdate: prodData.quantityUpdate,
  });

  const lastUpdated = JSON.parse(prodData.quantityUpdate.slice(-1));

  const [specification, setSpecification] = useState([]);
  const [invoice, setInvoice] = useState([]);

  const [currentTag, setCurrentTag] = useState("");

  const [rowCount, setRowCount] = useState(0);

  const [uploading, setUploading] = useState(false);

  /* Files */
  const [selectedfiles, setFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const fileInputRef = useRef(null);

  const [removeThumbs, setRemoveThumbs] = useState([]);

  const [currency, setCurrency] = useState(productData.currency);

  useEffect(() => {
    const specs = prodData.specifications.map((spec) => JSON.parse(spec));
    const invoices = prodData.invoice.map((inv) => JSON.parse(inv));
    setInvoice(invoices);
    setSpecification(specs);
    setProductData({
      ...productData,
      invoice: invoices,
      specifications: specs,
    });
  }, []);

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

  const handleRemoveOldThumb = (index, e) => {
    e.preventDefault();
    setRemoveThumbs([...removeThumbs, productData.fileId[index]]);
    console.log(productData.fileId);
    let updatedThumbArray = JSON.parse(JSON.stringify(productData.images));
    let updatedThumIdArray = JSON.parse(JSON.stringify(productData.fileId));
    const updatedThumbs = updatedThumbArray.filter((_, i) => i !== index);
    const updateThumbIds = updatedThumIdArray.filter((_, i) => i !== index);
    setProductData({
      ...productData,
      images: updatedThumbs,
      fileId: updateThumbIds,
    });
  };

  const handleRemoveFile = (index, e) => {
    e.preventDefault();
    const updatedFiles = selectedfiles.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const renderOldThumbs = () => {
    return productData.images.map((thumb, index) => (
      <div className="relative ">
        <button
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-white text-red-500 "
          onClick={(e) => handleRemoveOldThumb(index, e)}
        >
          <CloseIcon color="red" />
        </button>
        <img src={thumb} className="w-[250px] object-contain" />
      </div>
    ));
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

  const handleTagRemove = (event, index, type) => {
    switch (type) {
      case "serial":
        const updatedSerial = [...productData.serial];
        updatedSerial.splice(index, 1);
        setProductData({ ...productData, serial: updatedSerial });
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

  const handleRowChange = (index, field, value, type = "spec") => {
    if (type === "spec") {
      const updatedRows = [...specification];
      updatedRows[index][field] = value;
      setSpecification(updatedRows);
    } else if (type === "invoice") {
      const updatedInvoice = [...invoice];
      updatedInvoice[index][field] = value;
      setInvoice(updatedInvoice);
    }
  };

  const handleRemoveRow = (index, type = "spec") => {
    switch (type) {
      case "invoice":
        const updatedInvoice = [...invoice];
        console.log(updatedInvoice);
        updatedInvoice.splice(index, 1);
        setInvoice(updatedInvoice);

        setProductData({ ...productData, invoice: updatedInvoice });
        break;
      default:
        const updatedRows = [...specification];
        updatedRows.splice(index, 1);

        setSpecification(updatedRows);
        setProductData({ ...productData, specifications: updatedRows });
    }
  };

  const handleAddInvoices = (e) => {
    e.preventDefault();
    let newInvoices = [];
    for (let i of invoice) {
      if (i.invoice.trim() !== "" && i.date.trim() !== "") {
        newInvoices.push(i);
      }
    }
    console.log(newInvoices);
    console.log(typeof newInvoices);
    setInvoice(newInvoices);
    setProductData({ ...productData, invoice: newInvoices });
  };

  const handleAddSpecifications = (e) => {
    e.preventDefault();
    let newSpecs = [];
    for (let i of specification) {
      if (i.key.trim() !== "" && i.value.trim() !== "") {
        newSpecs.push(i);
      }
    }
    setProductData({ ...productData, specifications: newSpecs });
  };

  const onProductFormSubmit = async (e) => {
    e.preventDefault();
    let formComplete = true;
    if (productData.title === "") {
      formComplete = false;
      toast.error("Please enter product title");
    } else if (productData.sku === "") {
      formComplete = false;
      toast.error("Please enter product sku");
    } else if (
      skus.includes(productData.sku.trim()) &&
      prodData.sku.trim() !== productData.sku.trim()
    ) {
      formComplete = false;
      toast.error("This SKU number already exists");
    } else if (productData.category === "") {
      formComplete = false;
      toast.error("Please assign product category");
    } else if (productData.images.length === 0) {
      formComplete = false;
      toast.error("Please add atlease one image");
    } else if (productData.quantity < 0) {
      formComplete = false;
      toast.error("Please enter product quantity");
    } else if (!productData.contactForPrice && !productData.salePrice) {
      formComplete = false;
      toast.error("Please enter sale price");
    } else if (!productData.contactForPrice && !productData.costPrice) {
      formComplete = false;
      toast.error("Please enter cost price");
    } else {
      try {
        setUploading(true);
        if (formComplete) {
          let specs = [];
          for (const spec of productData.specifications) {
            specs.push(JSON.stringify(spec));
          }

          let newUrlArray = productData.images;
          let newFileIdArray = productData.fileId;

          if (removeThumbs.length > 0) {
            await deleteFiles(removeThumbs);
          }

          if (selectedfiles.length > 0) {
            let imagesData = await uploadProductFilesToBucket(selectedfiles);
            newUrlArray = [...productData.images, ...imagesData.urls];
            newFileIdArray = [...productData.fileId, ...imagesData.ids];
            setProductData({ ...productData, images: newUrlArray });
            setProductData({ ...productData, fileId: newFileIdArray });
          }

          if (
            productData.quantity >= 0 &&
            productData.quantity !== lastUpdated.quantityAfter &&
            prodData.quantityUpdate.length > 1
          ) {
            const newUpdate = JSON.stringify({
              date: new Date(),
              quantityBefore: lastUpdated.quantityAfter,
              quantityAfter: productData.quantity,
            });
            productData.quantityUpdate.push(newUpdate);
          }

          const invoices = productData.invoice.map((inv) =>
            JSON.stringify(inv)
          );

          await updateProduct(
            {
              title: productData.title,
              description: productData.description,
              sku: productData.sku,
              contactForPrice: productData.contactForPrice,
              salePrice: productData.salePrice,
              costPrice: productData.costPrice,
              quantity: productData.quantity,
              tags: productData.tags,
              images: newUrlArray,
              fileId: newFileIdArray,
              category: productData.category,
              specifications: specs,
              published: productData.published,
              currency,
              serial: productData.serial,
              invoice: invoices,
              quantityUpdate: productData.quantityUpdate,
            },
            prodData.$id
          ).then(() => {
            console.log("product added");
            setUploading(false);
            setShow(false);
          });
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
      // Category itself is a parent
      if (!categoryMap["isParent"]) {
        categoryMap["isParent"] = [];
      }
      categoryMap["isParent"].push(category);
    } else {
      // Category has a valid parent ID
      if (!categoryMap[parentId.split("&&")[0]]) {
        categoryMap[parentId.split("&&")[0]] = [];
      }
      categoryMap[parentId.split("&&")[0]].push(category);
    }
  });

  function generateOptions(categoryMap, parentId = "isParent", level = 0) {
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
      <div className="flex justify-between items-center py-6 px-3 bg-gray-900">
        <div className="flex flex-col mr-2 text-gray-300 ">
          <p className="font-semibold">Update Product</p>
          <p className="text-xs text-gray-300">
            Update your product and necessary information from here
          </p>
        </div>
        <button
          className="rounded-full shadow-xl p-2 w-[30px] h-[30px]  bg-white text-red-500 text-sm flex justify-center items-center"
          onClick={() => setShow(false)}
        >
          <CloseIcon style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
      <ToastContainer />
      <div className="fixed inset-x-0 bottom-0  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  justify-evenly px-3 py-6 bg-gray-900 gap-x-6 gap-y-3 z-50">
        <button
          className="bg-gray-700 col-span-1  py-2 w-full rounded-lg text-gray-500 hover:bg-gray-800 hover:text-red-700 font-semibold  border border-gray-700"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          onClick={onProductFormSubmit}
          className={
            uploading
              ? "bg-green-400 col-span-1 py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold cursor-not-allowed disabled"
              : "bg-green-400 col-span-1 py-2 w-full rounded-lg text-white hover:bg-green-500 font-semibold"
          }
        >
          {uploading ? "Uploading..." : "Update Product"}
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
                value={productData.title}
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
            </div>
          </div>

          {/* SKU */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                SKU (last used : {skus[-1]})
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <input
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none "
                type="text"
                name="title"
                value={productData.sku}
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
                    multiple="true"
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

                {selectedfiles.length > 0 || productData.images.length > 0 ? (
                  <div className="flex flex-wrap w-full justify-center space-x-3 space-y-2 items-center mt-3">
                    {renderOldThumbs()}
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
                value={productData.category?.$id}
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                onChange={(e) =>
                  setProductData({ ...productData, category: e.target.value })
                }
              >
                <option value="" selected hidden>
                  Select Category
                </option>
                {/* {categories?.map((category, index) => (
                  <option value={category.$id}>{category.name}</option>
                ))} */}
                {generateOptions(categoryMap)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <p className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Contact for Price
              </p>
            </div>
            <div
              className="col-span-1 lg:col-span-3 xl:col-span-3 px-2 relative cursor-pointer"
              onClick={() => {
                setProductData({
                  ...productData,
                  contactForPrice: !productData.contactForPrice,
                  salePrice: 0.0,
                  costPrice: 0.0,
                });
              }}
            >
              <input
                type="checkbox"
                checked={productData.contactForPrice}
                class="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[13px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </div>
          </div>

          {!productData.contactForPrice && (
            <>
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
            </>
          )}

          {/* Product Quantity */}
          <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 my-3">
            <div className="col-span-1 px-3">
              <label className="text-sm text-gray-200 mb-2 lg:mb-0 xl:mb-0 font-semibold text-gray-300">
                Total Product Quantity
              </label>
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-3 px-2">
              <input
                className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 focus:ring  focus:border-gray-500 focus:ring-gray-700 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                type="number"
                name="quantity"
                value={productData.quantity}
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
                {prodData.serial?.map((serialTag, index) => (
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
              <div className="flex w-full items-center mb-4 space-x-2">
                <div
                  className="border-0 border-white border-solid px-4 py-2 bg-gray-600 rounded-md cursor-pointer "
                  onClick={(e) => {
                    e.preventDefault();
                    setInvoice([...invoice, { invoice: "", date: "" }]);
                    console.log(invoice);
                  }}
                >
                  + Add Invoice
                </div>
                <button
                  onClick={handleAddInvoices}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Done
                </button>
              </div>
              {invoice.map((inv, index) => (
                <div className="flex my-2 items-center" key={index}>
                  <input
                    type="text"
                    className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md border-gray-600 bg-gray-700 border-2 h-12 text-sm focus:outline-none mr-4"
                    placeholder="Add Invoice Numbers"
                    value={inv.invoice}
                    onChange={(e) =>
                      handleRowChange(
                        index,
                        "invoice",
                        e.target.value,
                        "invoice"
                      )
                    }
                  />
                  <input
                    type="date"
                    className="block w-full px-3 py-1  text-gray-300 leading-5 rounded-md  border-gray-600 bg-gray-700 border-2 h-12 text-sm focus:outline-none"
                    max={new Date()}
                    placeholder="dd/mm/yyyy"
                    value={inv.date}
                    onChange={(e) =>
                      handleRowChange(index, "date", e.target.value, "invoice")
                    }
                  />
                  <CloseIcon
                    onClick={() => handleRemoveRow(index, "invoice")}
                    className="cursor-pointer"
                  />
                </div>
              ))}
              <div className="col-span-1 lg:col-span-3 xl:col-span-3">
                {productData.invoice.length > 0 ? (
                  <div className="pt-2">
                    <p className="text-sm text-gray-300">Added Invoices</p>
                    <table className="w-full whitespace-nowrap bg-gray-900">
                      {productData.invoice.map((inv, index) => (
                        <tr className="grid grid-cols-2 w-full text-gray-300 border border-gray-700 ring-1 ring-black ring-opacity-5">
                          <td className="col-span-1 px-4 py-3 border border-gray-700 ring-1 ring-black ring-opacity-5 ">
                            <p className="text-ellipsis w-full overflow-hidden">
                              {inv.invoice}
                            </p>
                          </td>
                          <td className="col-span-1 px-4 py-3 border border-gray-700 ring-1 ring-black ring-opacity-5">
                            <p className="text-ellipsis w-full overflow-hidden">
                              {inv.date}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-300 text-sm col-span-4">
                    No Invoices
                  </p>
                )}
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
                      className="w-full block px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-500 bg-gray-700 border h-12 border-transparent col-span-2"
                      onChange={(e) => {
                        handleRowChange(index, "key", e.target.value);
                      }}
                      value={spec.key}
                    />
                    <input
                      type="text"
                      placeholder="value"
                      className="w-full block px-3 py-1 text-sm focus:outline-none focus:border-gray-200 bg-gray-700 dark:text-gray-300 leading-5 rounded-md border h-12 border-transparent col-span-2"
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

export default EditProductScreen;
