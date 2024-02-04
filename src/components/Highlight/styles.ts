import styled from "styled-components/native";

export const Container = styled.View`
  width:100%;
  margin: 32px 0;
`
export const Title = styled.Text`
  text-align: center;

  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZE.XL}px;
`
export const Subtitle = styled.Text`
  text-align: center;

  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`