import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { CardProps } from '../../components/Card/Card';

type FlatListProps = {
  data: CardProps[];
  renderItem: ({ item }: { item: CardProps }) => JSX.Element;
};

export const Container = styled.View`
  flex: 1;
  padding: 30px 20px 20px 20px;
  background-color: #262626;
`;

export const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
`;

export const FlatListStocks = styled(FlatList)<FlatListProps>`
  flex: 1;
  width: 100%;
`;