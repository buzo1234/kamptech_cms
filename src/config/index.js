import {Client} from "appwrite"

const collectionID = "6463c06dcd8461180987";   // your collection ID
const databaseID="6463bd7a52591d3378f8"   // Your database ID
 // Here replace 'ProjectID' with the project ID that you created in your appwrite installation.

const client = new Client();

client
    .setEndpoint('http://64.227.164.212/v1')
    .setProject('646339a61beac87efd09');

export { client,collectionID,databaseID };

