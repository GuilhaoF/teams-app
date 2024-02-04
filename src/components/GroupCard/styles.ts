import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { UsersThree } from "phosphor-react-native";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  padding: 24px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;
  margin-bottom: 12px
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;
export const Icon = styled(UsersThree).attrs(({ theme }) => ({
  size: 36,
  color: theme.COLORS.GREEN_700,
  weight: "fill"
}))`
  margin-right: 20px;
`;
