import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ButtonSubmitProps {
  disabled?: boolean;
  disabledOpacity?: number;
}

export const Container = styled.View`
  margin-top: 10px;
`;

export const ButtonSubmit = styled(TouchableOpacity)<ButtonSubmitProps>`
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ disabled }) => (disabled ? '#cf7856' : '#FB6C34')};
  opacity: ${({ disabled, disabledOpacity = 0.5 }) => disabled ? disabledOpacity : 1};
`;

export const Title = styled.Text`
  text-transform: uppercase;
  font-weight: bold;
`;