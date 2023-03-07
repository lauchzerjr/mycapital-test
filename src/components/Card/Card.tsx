import React from "react";
import * as S from "./Card.styles";

export type Item = {
  id: string;
  idStock: string;
  nameStock: string;
  priceStock: string;
};

export type CardProps = {
  formattedDate: string;
  items: Item[];
};

export function Card({ formattedDate, items }: CardProps) {
  const isMoreStock = items.length > 1
  return (
    <>
      <S.DateHeader>Dia {formattedDate}</S.DateHeader>
      <S.Container isMoreStock={isMoreStock}>
        {items.map((item) => (
          <S.ContainerStocks key={item.id} isMoreStock={isMoreStock}>
            <S.NameStockText>Nome: {item.nameStock}</S.NameStockText>
            <S.HStackContainer>
              <S.IdStockText>Código: {item.idStock}</S.IdStockText>
              <S.PriceStockText>Valor: {item.priceStock}</S.PriceStockText>
            </S.HStackContainer>
          </S.ContainerStocks>
        ))}
      </S.Container>
    </>
  );
}
