import React, { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { useToast } from "native-base";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { DatePickerComponent } from "../../components/DatePicker/DatePicker";
import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit";
import { Input } from "../../components/Input/Input";
import * as S from "./Home.styles";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export function Home() {
  const [idStock, setIdStock] = useState("");
  const [nameStock, setNameStock] = useState("");
  const [priceStock, setPriceStock] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [fieldsFilled, setFieldsFilled] = useState(false);

  const toast = useToast();

  const { getItem, setItem } = useAsyncStorage("@mycapitaltest:stocks");

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  async function handleSubmitStock() {
    try {
      const id = uuid.v4();

      const date = selectedDate.toISOString().slice(0, 10);
      const formattedDate = date.split("-").reverse().join("/");

      const newData = {
        formattedDate,
        items: [
          {
            id,
            idStock,
            nameStock,
            priceStock,
          },
        ],
      };

      const response = await getItem();
      const previousData = response ? JSON.parse(response) : [];

      const existingFormattedData = previousData.filter(
        (data) => data.formattedDate === formattedDate
      );

      if (existingFormattedData && existingFormattedData.length > 0) {
        const existingData = existingFormattedData[0];

        const updatedData = {
          ...existingData,
          items: [
            ...existingData.items,
            {
              id,
              idStock,
              nameStock,
              priceStock,
            },
          ],
        };

        const newData = previousData.map((data) =>
          data.formattedDate === formattedDate ? updatedData : data
        );

        await setItem(JSON.stringify(newData));
      } else {
        const data = [...previousData, newData];
        await setItem(JSON.stringify(data));
      }

      toast.show({
        title: "Ação cadastrada com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
    } catch (error) {
      console.log("error", error);

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
    handleBlur();
  }

  function handleDateSelected(date: Date) {
    setSelectedDate(date);
  }

  useEffect(() => {
    setFieldsFilled(!!idStock && !!nameStock && !!priceStock && !!selectedDate);
  }, [idStock, nameStock, priceStock, selectedDate]);

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <S.Container>
        <S.Title>Cadastro de ação</S.Title>

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
    </TouchableWithoutFeedback>
  );
}
