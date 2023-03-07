import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./ButtonSubmit.styles";

export function ButtonSubmit({ ...rest }: TouchableOpacityProps) {
  return (
    <S.Container>
      <S.ButtonSubmit {...rest}>
        <S.Title>Cadastrar</S.Title>
      </S.ButtonSubmit>
    </S.Container>
  );
}
