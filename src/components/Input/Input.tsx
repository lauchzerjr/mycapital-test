import React, { useState } from "react";
import { TextInputProps } from "react-native";

import * as S from "./Input.styles";

type InputProps = TextInputProps & {
  label: string;
  isPriceInput?: boolean;
  fullWidth?: boolean;
};

export function Input({ label, isPriceInput = false, fullWidth = false, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <S.Container fullWidth={fullWidth}>
      <S.Title>{label}</S.Title>

      {!!isPriceInput ? (
        <S.TextInputMaskComponent
          isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          cursorColor="#FFF"
          placeholderTextColor="#b3b3b3"
          type={"money"}
          options={{
            precision: 2,
            separator: ",",
            delimiter: ".",
            unit: "R$",
            suffixUnit: "",
          }}
          {...rest}
        />
      ) : (
        <S.Input
          isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          cursorColor="#FFF"
          placeholderTextColor="#b3b3b3"
          
          {...rest}
        />
      )}
    </S.Container>
  );
}
