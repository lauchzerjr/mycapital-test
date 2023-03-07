import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

interface InputProps {
  isFocused: boolean
}

interface ContainerProps {
  fullWidth?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "48%")};;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #FFF;
`;

export const Input = styled(TextInput)<InputProps>`
  height: 40px;
  border-width: 2px;
  padding-left: 10px;
  border-radius: 5px;
  color: #fff;
  border-color: ${({ isFocused }) => (isFocused ? "#FB6C34" : "#E3E3E3")};
`;

export const TextInputMaskComponent = styled(TextInputMask)<InputProps>`
  height: 40px;
  border-width: 2px;
  padding-left: 10px;
  border-radius: 4px;
  color: #fff;
  border-color: ${({ isFocused }) => (isFocused ? "#FB6C34" : "#E3E3E3")};
`;