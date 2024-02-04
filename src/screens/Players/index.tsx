import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import {
  Container,
  ContainerButtons,
  Form,
  HeaderList,
  NumbersOfPlayers,
} from "./styles";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Alert, FlatList, TextInput } from "react-native";
import { useEffect, useState, useRef } from "react";
import { PlayerCard } from "@components/Playercard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import AsyncStorage from "@react-native-async-storage/async-storage";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const newPlayerNameRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const [score, setScore] = useState(0);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Novo Jogador", "Nome do jogador é obrigatório");
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    };
    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameRef.current?.blur(); // Remove focus from input
      setNewPlayerName("");
      fetchPlayers(); //  Fetch players again to update the list
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Jogador", error.message);
      } else {
        Alert.alert("Novo Jogador", "Erro ao adicionar novo jogador !");
      }
    }
  }
  async function fetchPlayers() {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao buscar jogadores");
    }
  }
  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayers();
    } catch (error) {
      Alert.alert("Erro", "Erro ao remover jogador");
    }
  }
  async function RemoveGroup() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      Alert.alert("Erro", "Erro ao remover turma");
    }
  }
  async function handleRemoveGroup() {
    Alert.alert("Remover Turma", "Deseja realmente remover a turma?", [
      {
        text: "Nao",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => RemoveGroup(),
      },
    ]);
  }
  async function handleAddScore() {
    setScore(score + 1);
    try {
      const existingScores = await AsyncStorage.getItem(`scores_${group}`);
      const scores = existingScores ? JSON.parse(existingScores) : {};
      scores[team] = scores[team] ? scores[team] + 1 : 1;
    
      await AsyncStorage.setItem(`scores_${group}`, JSON.stringify(scores));
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao salvar pontuação");
    }
  }
  async function fetchScore() {
    try {
      const existingScores = await AsyncStorage.getItem(`scores_${group}`);
      const scores = existingScores ? JSON.parse(existingScores) : {};
      setScore(scores[team] || 0);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao buscar pontuação");
    }
  }

  useEffect(() => {
    fetchPlayers();
    fetchScore();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerNameRef}
          placeholder="Nome do Jogador"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done" // Change keyboard return key to "Done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <ContainerButtons>
        <Button
          style={{ minHeight: 40, padding: 4 }}
          title="+"
          type="PRIMARY"
          onPress={handleAddScore}
        />
        <Button
          style={{ minHeight: 40, padding: 4 }}
          title="-"
          type="SECONDARY"
          onPress={() => setScore(score - 1)}
        />
      </ContainerButtons>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>Pontuaçao ({score})</NumbersOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Nao há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
      />

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
