import { Client } from "appwrite";

const categoryCollectionID = "6463c06dcd8461180987";
const ordersCollectionID = "6464f3d749d7a7ac75ba";
const databaseID = "6463bd7a52591d3378f8";

const client = new Client();

client
  .setEndpoint("https://appwrite.techsouqdubai.com/v1")
  .setProject("646339a61beac87efd09");

export { client, categoryCollectionID, databaseID, ordersCollectionID };
