import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "./storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(groupName: string) {
  try {

    const stotedGroups = await  groupGetAll();

    const groupAlreadyExists = stotedGroups.includes(groupName);

    if(groupAlreadyExists){
      throw new AppError('Group already exists');
    }

    const storage = JSON.stringify([...stotedGroups, groupName]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}
