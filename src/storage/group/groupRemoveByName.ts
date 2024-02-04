import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PLAYER_COLLECTION,
  GROUP_COLLECTION,
} from "@storage/group/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function groupRemoveByName(groupName: string) {
  try {
    const storedGroups = await groupGetAll();
    const groups = storedGroups.filter((group) => group !== groupName);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
}
