import { Account, Databases, ID, Query, Storage } from "appwrite";
import {
  client,
  categoryCollectionID,
  databaseID,
  ordersCollectionID,
} from "../config";

const account = new Account(client);
const storage = new Storage(client);
const database = new Databases(client);

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

const getCategories = async () => {
  try {
    return await database.listDocuments(databaseID, categoryCollectionID);
  } catch (e) {
    console.error(e.message);
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
    console.error(e.message);
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

export {
  createCategory,
  getCategories,
  login,
  getUserData,
  addCategoryImage,
  getParentCategories,
  getCategoryName,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
