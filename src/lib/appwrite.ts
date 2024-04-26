import { Client, Account, ID } from "react-native-appwrite"

export const config = {
  endpoint: process.env.EXPO_PUBLIC_API_URL || "", 
  platform: process.env.EXPO_PUBLIC_PLATFORM || "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || ""
}

const client = new Client()
const account = new Account(client)


client.setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(config.projectId)
  .setPlatform(config.platform)

interface  CreateUser {
  email: string;
  username: string;
  password: string;
}

export const createUser = async ({ email, username, password }: CreateUser) => {
  account.create(ID.unique(), email, password, username)
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}
