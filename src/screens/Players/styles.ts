import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 16px;
`;
export const Form = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  justify-content: center;
  flex-direction: row;
`;
export const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
export const NumbersOfPlayers = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
  `};
`;
export const ContainerButtons = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: -16px;
`;
