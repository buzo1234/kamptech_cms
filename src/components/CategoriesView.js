import React, { useEffect, useState } from "react";
import "../styles/toggleSwitch.css";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import { getImmediateParent, updatetonull } from "../actions";

const CategoriesView = ({
  catList,
  relList,
  setEditId,
  setShow,
  show,
  setDeleteId,
  setDelShow,
  delShow,

}) => {


  const handleEditClick = (catData) => {
    console.log(catData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setEditId(catData);
    setShow(!show);
  };

  const handleDeleteClick = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setDeleteId(id);
    setDelShow(!delShow);

  };

  

  return (
    <div>
      {catList ? (
        <div className="w-full overflow-hidden border border-gray-700 rounded-lg ring-1 ring-black ring-opacity-5 mb-8 bg-gray-900 overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-primary">
              <tr>
                <td className="px-4 py-3">Icon</td>
                <td className="px-4 py-3">Name</td>
                <td className="px-4 py-3">Description</td>
                <td className="px-4 py-3">Parent</td>
                <td className="px-4 py-3">Published</td>
                <td className="px-4 py-3">Actions</td>
              </tr>
            </thead>
            <tbody>
              {catList?.map(
                ({ image, name, parent, published, desc, $id, newParent }, index) => (
                  <tr key={$id}>
                    <td className="px-4 py-3">
                      <img
                        src={image}
                        className="w-[40px] h-[40px] object-contain"
                        alt={`${$id}-${name}`}
                      />
                    </td>
                    <td className="px-4 py-3">{name}</td>
                    <td className="px-4 py-3 max-w-[250px]">
                      <p className="text-ellipsis overflow-hidden ">{desc}</p>
                    </td>
                    <td className="px-4 py-3">
                      {/* {parent && parent !== "isParent"
                        ? parent.split("&&")[1]
                        : "--"}<br/> */}
                      {newParent.length> 0 ? newParent[0]?.parent?.name: "---"}
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
                          onClick={() => handleEditClick(catList[index])}
                        >
                          <BorderColorSharpIcon
                            className="hover:text-green-600"
                            style={{ width: "19px", height: "19px" }}
                          />
                        </button>
                        <button
                          className="mr-2"
                          onClick={() => handleDeleteClick(`${$id}&&${name}`)}
                        >
                          <DeleteOutlineSharpIcon
                            className="hover:text-red-600"
                            style={{ width: "19px", height: "19px" }}
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
        <div>No Categories yet</div>
      )}
    </div>
  );
};

export default CategoriesView;
