import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useToast } from "native-base";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { DatePickerComponent } from "../../components/DatePicker/DatePicker";
import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit";
import { Input } from "../../components/Input/Input";
import * as S from "./Home.styles";

export function Home() {
  const [idStock, setIdStock] = useState("");
  const [nameStock, setNameStock] = useState("");
  const [priceStock, setPriceStock] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [fieldsFilled, setFieldsFilled] = useState(false);

  const toast = useToast();

  const { getItem, setItem } = useAsyncStorage("@mycapitaltest:stocks");

  async function handleSubmitStock() {
    try {
      const id = uuid.v4();

      const date = selectedDate.toISOString().slice(0, 10);
      const formattedDate = date.split("-").reverse().join("/");

      console.log(formattedDate);

      const newData = {
        id,
        idStock,
        nameStock,
        priceStock,
        formattedDate
      };

      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      await setItem(JSON.stringify(data));
      console.log(JSON.stringify(data));

      toast.show({
        title: "Ação cadastrada com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Algo deu errado, tente novamente mais tarde.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    setIdStock("");
    setNameStock("");
    setPriceStock("");
    setSelectedDate(undefined);
  }

  function handleDateSelected(date: Date) {
    setSelectedDate(date);
  }

  useEffect(() => {
    setFieldsFilled(!!idStock && !!nameStock && !!priceStock && !!selectedDate);
  }, [idStock, nameStock, priceStock, selectedDate]);

  return (
    <S.Container>
      <S.ContainerTitle>
        <S.Title>Cadastro de ação</S.Title>
      </S.ContainerTitle>

      <Input
        label="Nome da ação"
        placeholder="ex: Petrobras"
        onChangeText={setNameStock}
        value={nameStock}
        fullWidth
      />
      <S.ContainerInput>
        <Input
          label="Código da ação"
          maxLength={5}
          autoCapitalize="characters"
          placeholder="ex: PETR4"
          onChangeText={setIdStock}
          value={idStock}
        />
        <Input
          isPriceInput={true}
          label="Valor da ação"
          placeholder="ex: R$25,96"
          keyboardType="numeric"
          onChangeText={setPriceStock}
          value={priceStock}
          
        />
      </S.ContainerInput>

      <DatePickerComponent onDateSelected={handleDateSelected} />

      <ButtonSubmit onPress={handleSubmitStock} disabled={!fieldsFilled} />
    </S.Container>
  );
}
