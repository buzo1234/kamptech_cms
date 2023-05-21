import { Account, Databases, ID, Query, Storage } from 'appwrite';
import {
  client,
  categoryCollectionID,
  databaseID,
  ordersCollectionID,
} from '../config';

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

const deleteCategory = async (id) => {
  const catid = id.split('&&')[0];
  console.log(catid);
  try {
    const response = await database.listDocuments(
      databaseID,
      categoryCollectionID,
      [Query.equal('parent', id)]
    );
    const documents = response.documents;

    for (const document of documents) {
      await storage.deleteFile(document.bucketId, document.fileId);
      await database
        .deleteDocument(databaseID, categoryCollectionID, document.$id)
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting document:', error);
        });
    }

    await database.deleteDocument(databaseID, categoryCollectionID, catid);
  } catch (e) {
    console.log(e.message);
  }
};

const getParentCategories = async () => {
  try {
    return await database.listDocuments(databaseID, categoryCollectionID, [
      Query.equal('parent', 'isParent'),
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
      [Query.equal('$id', id)]
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
    return await storage.createFile('6463d825b38c9f1d947c', ID.unique(), image);
  } catch (e) {
    console.error('msg : ', e.message);
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

const verifyGoogleAccount = () => {
  try {
    account.createOAuth2Session(
      'google',
      'https://console.techsouqdubai.com/',
      'https://console.techsouqdubai.com/login'
    );
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
  try{
    await account.deleteSession("current");
  }catch(e){
    console.log(e)
  }
}

export {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  login,
  getUserData,
  addCategoryImage,
  getParentCategories,
  getCategoryName,
  getOrders,
  getOrderById,
  updateOrderStatus,
  verifyGoogleAccount,
  getAccountDetails,
  logout
};
