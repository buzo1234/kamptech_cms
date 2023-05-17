import { Client } from "appwrite";

const categoryCollectionID = "6463c06dcd8461180987";
const ordersCollectionID = "6464f3d749d7a7ac75ba";
const databaseID = "6463bd7a52591d3378f8";

const client = new Client();

client
  .setEndpoint("http://64.227.164.212/v1")
  .setProject("646339a61beac87efd09");

export { client, categoryCollectionID, databaseID, ordersCollectionID };
