import React from "react";
import { MaterialIcons } from '@expo/vector-icons'; 

import * as S from "./ListEmptyComponent.styles";

export function ListEmptyComponent() {
  return (
    <S.Container>
      <S.Text>Você ainda não possui ações cadastradas.</S.Text>

      <MaterialIcons name="search-off" size={50} color="white" />

      <S.Text>Volte para a página de início e cadastre uma ação!</S.Text>
    </S.Container>
  );
}
