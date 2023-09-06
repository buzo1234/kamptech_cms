import { Account, Databases, ID, Query, Storage } from "appwrite";
import {
  client,
  categoryCollectionID,
  databaseID,
  ordersCollectionID,
  productsCollectionID,
  adminUserCollectionID,
  categoryRelationShipID,
} from '../config';

const account = new Account(client);
const storage = new Storage(client);
const database = new Databases(client);

const getCategoryRelations = async () => {
  try {
    return await database.listDocuments(databaseID, categoryRelationShipID);
  } catch (e) {
    console.error(e.message);
  }
};

const getImmediateParent = async (id) => {
  try {
    return await database.listDocuments(databaseID, categoryRelationShipID, [
      Query.equal('child.$id', id),
    ]);
  } catch (e) {
    console.error(e.message);
  }
};

const createCategoryRelation = async (relationData) => {
  try {
    return await database.createDocument(
      databaseID,
      categoryRelationShipID,
      ID.unique(),
      relationData
    );
  } catch (e) {
    console.error(e.message);
  }
};

const updateCategoryRelation = async (id, relationData) => {
  try {
    return await database.updateDocument(
      databaseID,
      categoryRelationShipID,
      id,
      relationData
    );
  } catch (e) {
    console.error(e.message);
  }
};

const deleteCategoryRelation = async (id) => {
  try{
    return await database.deleteDocument(databaseID, categoryRelationShipID, id)
  }catch(e) {
    console.error(e.message);
  }
}

const createCategory = async (categoryData) => {
  try {
    return await database.createDocument(
      databaseID,
      categoryCollectionID,
      ID.unique(),
      categoryData
    );
  } catch (e) {
    console.error(e.message);
  }
};

const createProduct = async (productData) => {
  try {
    return await database.createDocument(
      databaseID,
      productsCollectionID,
      ID.unique(),
      productData
    );
  } catch (e) {
    console.error(e.message);
  }
};

const getCategories = async () => {
  try {
    return await database.listDocuments(databaseID, categoryCollectionID);
  } catch (e) {
    console.error(e.message);
  }
};

const updateCategory = async (categoryData, id) => {
  try {
    return await database.updateDocument(
      databaseID,
      categoryCollectionID,
      id,
      categoryData
    );
  } catch (e) {
    console.log(e.message);
  }
};

const updateProduct = async (productData, id) => {
  try {
    return await database.updateDocument(
      databaseID,
      productsCollectionID,
      id,
      productData
    );
  } catch (e) {
    console.log(e.message);
  }
};
};

const deleteCategory = async (id) => {
  const catid = id.split("&&")[0];
  console.log(catid);
  try {
    const response = await database.listDocuments(
      databaseID,
      categoryCollectionID,
      [Query.equal('parent', catid)]
    );
    const documents = response.documents;

    for (const document of documents) {
      await storage.deleteFile(document.bucketId, document.fileId);
      await database
        .deleteDocument(databaseID, categoryCollectionID, document.$id)
        .then(() => {
          console.log("Document deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting document:", error);
        });
    }

    await database.deleteDocument(databaseID, categoryCollectionID, catid);
  } catch (e) {
    console.log(e.message);
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await database.listDocuments(
      databaseID,
      productsCollectionID,
      [Query.equal("$id", id)]
    );
    const documents = response.documents;

    for (const document of documents) {
      for (const image of document.fileId) {
        await storage.deleteFile("64652f7768e9d723b587", image);
      }
    }

    await database
      .deleteDocument(databaseID, productsCollectionID, id)
      .then(() => {
        return {
          status: true,
          message: "Product deleted successfully",
        };
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  } catch (e) {
    console.log(e.message);
  }
};

const getParentCategoriesNew = async () => {
  try {
    var parents = [];
    database.listDocuments(databaseID, categoryRelationShipID).then((res) => {
      const relations = res.documents;
      relations.map((rel) => {
        if (!parents.includes(rel?.parent?.$id)) parents.push(rel);
      });
    });

    return parents;
  } catch (e) {
    console.log(e.message);
  }
};

const getParentCategories = async () => {
  try {
    return await database.listDocuments(databaseID, categoryCollectionID, [
      Query.equal("parent", "isParent"),
    ]);
  } catch (e) {
    console.log(e.message);
  }
};

const getCategoryName = async (id) => {
  try {
    const response = await database.listDocuments(
      databaseID,
      categoryCollectionID,
      [Query.equal("$id", id)]
    );

    return response.documents[0];
  } catch (e) {
    console.log(e.message);
  }
};

const login = async (email, password) => {
  try {
    return await account.createEmailSession(email, password);
  } catch (e) {
    console.error(e.message);
  }
};

const getUserData = async () => {
  try {
    return await account.get();
  } catch (e) {
    console.error(e.message);
  }
};

const addCategoryImage = async (image) => {
  try {
    return await storage.createFile("6463d825b38c9f1d947c", ID.unique(), image);
  } catch (e) {
    console.error("msg : ", e.message);
  }
};

const deleteFiles = async (ids) => {
  try {
    for (const id of ids) {
      await storage.deleteFile("64652f7768e9d723b587", id);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const uploadProductFilesToBucket = async (selectedFiles) => {
  try {
    const uploadedImagesUrl = [];
    const uploadedImageFileId = [];
    const uploadPromises = selectedFiles.map(async (file) => {
      try {
        const uploadedImage = await storage.createFile(
          "64652f7768e9d723b587",
          ID.unique(),
          file
        );

        uploadedImagesUrl.push(
          `https://appwrite.techsouqdubai.com/v1/storage/buckets/64652f7768e9d723b587/files/${uploadedImage.$id}/view?project=646339a61beac87efd09`
        );

        uploadedImageFileId.push(uploadedImage.$id);
      } catch (error) {
        console.error(`Error uploading image: ${error.message}`);
      }
    });

    await Promise.all(uploadPromises);
    return { urls: uploadedImagesUrl, ids: uploadedImageFileId };
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

const getOrders = async () => {
  try {
    const orders = await database.listDocuments(databaseID, ordersCollectionID);
    return orders;
  } catch (e) {
    console.error(e.message);
  }
};

const getOrderById = async (documentId) => {
  try {
    const orderById = await database.getDocument(
      databaseID,
      ordersCollectionID,
      documentId
    );
    return orderById;
  } catch (e) {
    console.log(e.message);
  }
};

const updateOrderStatus = async (documentId, orderStatus) => {
  try {
    const orderById = await database.updateDocument(
      databaseID,
      ordersCollectionID,
      documentId,
      { Status: orderStatus }
    );
    return orderById;
  } catch (e) {
    console.error(e);
  }
};

const getProducts = async () => {
  try {
    const allProducts = await database.listDocuments(
      databaseID,
      productsCollectionID
    );
    return allProducts;
  } catch (e) {
    console.error("msg: ", e.message);
  }
};

const verifyGoogleAccount = () => {
  try {
    const url = window.location.href.includes("localhost")
      ? "http://localhost:3000"
      : "https://console.techsouqdubai.com";
    account.createOAuth2Session("google", `${url}/login`, `${url}/login`);
  } catch (e) {
    console.error(e.message);
  }
};

const getAccountDetails = async () => {
  try {
    return await account.get();
  } catch (e) {
    console.log(e.message);
  }
};

const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (e) {
    console.log(e);
  }
};

const getAdmins = async () => {
  try {
    const admins = await database.listDocuments(
      databaseID,
      adminUserCollectionID
    );
    return admins;
  } catch (e) {
    console.error(e.message);
  }
};

export {
  createCategory,
  getCategories,
  updateCategory,
  updateProduct,
  deleteCategory,
  deleteProduct,
  login,
  getUserData,
  addCategoryImage,
  getParentCategories,
  getCategoryName,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getProducts,
  verifyGoogleAccount,
  getAccountDetails,
  logout,
  getAdmins,
  uploadProductFilesToBucket,
  createProduct,
  deleteFiles,
  createCategoryRelation,
  getImmediateParent,
  getCategoryRelations,
  getParentCategoriesNew,
  updateCategoryRelation,
  deleteCategoryRelation
};
