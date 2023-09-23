import { Client } from 'appwrite';

const categoryCollectionID = process.env.REACT_APP_CATEGORY_COLLECTION;
const ordersCollectionID = process.env.REACT_APP_ORDER_COLLECTION;
const productsCollectionID = process.env.REACT_APP_PRODUCT_COLLECTION;
const adminUserCollectionID = process.env.REACT_APP_ADMIN_COLLECTION;
const databaseID = process.env.REACT_APP_DATABASE_ID;

const categoryRelationShipID =
  process.env.REACT_APP_CATEGORY_RELATION_COLLECTION;
const navlinkCollectionID = process.env.REACT_APP_NAVLINK_COLLECTION;

const client = new Client();

client
  .setEndpoint('https://appwrite.techsouqdubai.com/v1')
  .setProject(process.env.REACT_APP_PROJECT_ID);

export {
  client,
  categoryCollectionID,
  databaseID,
  ordersCollectionID,
  productsCollectionID,
  adminUserCollectionID,
  categoryRelationShipID,
  navlinkCollectionID,
};
