import { Account,Databases,ID, Storage } from "appwrite";
import { client,collectionID,databaseID } from "../config";

const account = new Account(client);
const storage = new Storage(client);
const database = new Databases(client);

const createCategory = async categoryData => {
    try {
      return database.createDocument(
        databaseID,
        collectionID,
        ID.unique(),
        categoryData,
      );
    } catch (e) {
      console.error(e.message);
    }
  };
  
  const getCategories = async () => {
    try {
      return database.listDocuments(databaseID,collectionID);
    } catch (e) {
      console.error(e.message);
    }
  };

  const login = async (email, password) => {
    try {
      return  account.createEmailSession(email, password);
    } catch (e) {
      console.error(e.message);
    }
  };

  const getUserData = async () => {
    try {
      return account.get();
    } catch (e) {
      console.error(e.message);
    }
  };

  const addCategoryImage = async image => {
    try{
      return storage.createFile("6463d825b38c9f1d947c" , ID.unique(), image)
    }catch(e){
      console.error(e.message)
    }
  }

  export {createCategory, getCategories, login, getUserData, addCategoryImage};