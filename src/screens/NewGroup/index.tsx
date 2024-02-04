import { Header } from "@components/Header";
import { Container, Content, Icon } from "./styles";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState<string>("");
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo ", "Nome da turma é obrigatório");
      }

      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo ", error.message);
        console.log(error);
      } else {
        Alert.alert("Novo Grupo ", "Erro ao criar novo grupo");
        console.log(error);
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subtitle="crie uma nova turma para jogar"
        />
        <Input placeholder="Nome da Turma" onChangeText={setGroup} />
        <Button
          title="Criar Turma"
          style={{ marginTop: 8 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  );
}
