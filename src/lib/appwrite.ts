import {
  Client,
  Account,
  Avatars,
  Databases,
  Query,
  ID,
} from "react-native-appwrite";

export const config = {
  endpoint: process.env.EXPO_PUBLIC_API_URL || "",
  platform: process.env.EXPO_PUBLIC_PLATFORM || "",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID || "",
  databaseId: process.env.EXPO_PUBLIC_DATABASE_ID || "",
  userCollectionId: process.env.EXPO_PUBLIC_USER_COLLECTION_ID || "",
  videoCollectionId: process.env.EXPO_PUBLIC_VIDEO_COLLECTION_ID || "",
};

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

interface CreateUser {
  email: string;
  username: string;
  password: string;
}

export const createUser = async ({ email, username, password }: CreateUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    const avatar = avatars.getInitials(username);

    await signIn({ email, password });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new error(error);
  }
};

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
