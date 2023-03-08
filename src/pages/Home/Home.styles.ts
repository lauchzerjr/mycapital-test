import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px 20px 20px 20px;
  background-color: #262626;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #FFF;
  margin-bottom: 10px;
  text-align: center;
`;

export const ContainerInput = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ScrollGraphContainer = styled.ScrollView`
  flex: 1;
`;

export const ScrollTitleContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  height: 60px;
`;

export const ScrollTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFF;
  text-align: center;
`;
