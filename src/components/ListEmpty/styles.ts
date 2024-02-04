import { XCircle } from "phosphor-react-native";
import styled from "styled-components/native";


export const  Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const Message = styled.Text`
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  text-align: center;
`
export const Icon = styled(XCircle).attrs(({ theme }) => ({
  size: 36,
  color: theme.COLORS.RED,
  weight: "fill"
}))``;