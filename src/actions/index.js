import { Account, Databases, ID, Query, Storage } from 'appwrite';
import { client, collectionID, databaseID } from '../config';

const account = new Account(client);
const storage = new Storage(client);

const database = new Databases(client);

const createCategory = async (categoryData) => {
  try {
    return await database.createDocument(
      databaseID,
      collectionID,
      ID.unique(),
      categoryData
    );
  } catch (e) {
    console.error(e.message);
  }
};

const getCategories = async () => {
  try {
    return await database.listDocuments(databaseID, collectionID);
  } catch (e) {
    console.error(e.message);
  }
};

const getParentCategories = async () => {
  try {
    return await database.listDocuments(databaseID, collectionID, [
      Query.equal('parent', 'isParent'),
    ]);
  } catch (e) {
    console.log(e.message);
  }
};

const getCategoryName = async (id) => {
  try {
    const response = await database.listDocuments(databaseID, collectionID, [
      Query.equal('$id', id),
    ]);

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
    return await storage.createFile('6463d825b38c9f1d947c', ID.unique(), image);
  } catch (e) {
    console.error(e.message);
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
};
