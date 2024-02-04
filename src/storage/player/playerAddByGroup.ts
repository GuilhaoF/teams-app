import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/group/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  groupName: string
) {
  try {
    const storedPlayers = await playersGetByGroup(groupName); // get all players from the group

    const playerAlreadyExists = storedPlayers.filter(player => player.name === newPlayer.name); // check if the player already exists
    
    if(playerAlreadyExists.length > 0){ // if the player already exists, throw an error
      throw new AppError('Player ja esta adicionada em um time.');
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]); // add the new player to the list of players

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${groupName}`, storage);
  } catch (error) {
    throw error;
  }
}
