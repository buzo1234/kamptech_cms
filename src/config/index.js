import { Client } from "appwrite";

const categoryCollectionID = "6463c06dcd8461180987";
const ordersCollectionID = "6464f3d749d7a7ac75ba";
const productsCollectionID = "64652e560ee0b611f96f";
const adminUserCollectionID = "6469e82fa2896f5ccf03";
const databaseID = "6463bd7a52591d3378f8";

const categoryRelationShipID = "64f8179853f3291b0835";

const client = new Client();

client
  .setEndpoint("https://appwrite.techsouqdubai.com/v1")
  .setProject("646339a61beac87efd09");

export {
  client,
  categoryCollectionID,
  databaseID,
  ordersCollectionID,
  productsCollectionID,
  adminUserCollectionID,

  categoryRelationShipID
};
