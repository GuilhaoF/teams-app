import { useEffect, useState, useCallback } from "react";
import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { FlatList } from "react-native";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate("new");
  }
  async function fetchGroups() {
    try{
     const data = await groupGetAll()
     setGroups(data)
    }catch(error){
      console.log(error);
    }
  }
  function handleOpenGroup(group: string) {
    navigation.navigate("players", { group });
  }
  useFocusEffect(useCallback(() => { //useFocusEffect é um hook do react-navigation que é disparado toda vez que a tela é focada
    fetchGroups();
  },[]))

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item}  onPress={() => handleOpenGroup(item)}/>}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Nenhuma turma encontrada !" />
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button title="Criar Turma" onPress={handleNewGroup} />
    </Container>
  );
}
