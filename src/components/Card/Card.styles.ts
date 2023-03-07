
import styled from 'styled-components/native';

export const Container = styled.View<{ isMoreStock?: boolean }>`
  width: 100%;
  margin-bottom: ${({ isMoreStock }) => (isMoreStock ? 0 : "10px")};
`;

export const ContainerStocks = styled.View<{ isMoreStock: boolean }>`
  width: 100%;
  padding: 10px;
  margin-bottom: ${({ isMoreStock }) => (isMoreStock ? "10px" : 0)};
  border-width: 2px;
  border-radius: 5px;
  border-color: #FB6C34;
`;

export const HStackContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;

export const DateHeader = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;

export const NameStockText = styled.Text`
  color: #FFF;
  font-size: 16px;
  font-weight: bold;
`;

export const IdStockText = styled.Text`
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
`;

export const PriceStockText = styled.Text`
  color: #FFF;
  font-size: 14px;
  font-weight: bold;
`;
