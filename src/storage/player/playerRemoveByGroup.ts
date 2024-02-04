import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./playersGetByGroup";
import { PLAYER_COLLECTION } from "@storage/group/storageConfig";

export async function playerRemoveByGroup(
  playerName: string,
  groupName: string
) {
  try {
    const storage = await playersGetByGroup(groupName);
    const filteredPlayers = storage.filter(
      (player) => player.name !== playerName
    ); // remove the player from the list of players
    const storageString = JSON.stringify(filteredPlayers); // convert the list of players to a string

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${groupName}`,
      storageString
    ); // save the list of players to the storage
  } catch (error) {
    throw error;
  }
}
