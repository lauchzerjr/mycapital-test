import React, { useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import uuid from "react-native-uuid";
import { useToast } from "native-base";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory-native";

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
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const toast = useToast();

  const { getItem, setItem } = useAsyncStorage("@stocksapp:stocks");

  const handleBlur = () => {
    Keyboard.dismiss();
  };

  async function handleSubmitStock() {
    setIsSubmit(false);
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
            priceStock: Number(priceStock
              .replace("R$", "")
              .replace(/[^\d,]/g, "")
              .replace(",", ".")),
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
              priceStock: Number(priceStock
                .replace("R$", "")
                .replace(/[^\d,]/g, "")
                .replace(",", ".")),
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
    setIsSubmit(true);
  }

  function handleDateSelected(date: Date) {
    setSelectedDate(date);
  }

  const getDateAndPrice = async () => {
    const response = await getItem();

    if (response) {
      const data = JSON.parse(response);

      const newData = data.map((item) => {
        const price: number =
          item.items.length === 1
            ? item.items[0].priceStock
            : item.items.reduce((acc, obj) => acc + obj.priceStock, 0);

        const returnData = {
          formattedDate: item.formattedDate,
          priceStock: Number(price),
        };

        return returnData;
      });

      setData(newData);
    }
  };

  useEffect(() => {
    setFieldsFilled(!!idStock && !!nameStock && !!priceStock && !!selectedDate);
  }, [idStock, nameStock, priceStock, selectedDate]);

  useEffect(() => {
    getDateAndPrice();
  }, [isSubmit]);

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

        {data.length !== 0 && (
          <>
            <S.ScrollTitleContainer>
              {data.length > 4 && (
                <>
                  <S.ScrollTitle>Arraste para o lado </S.ScrollTitle>
                  <Entypo name="arrow-right" size={24} color="white" />
                </>
              )}
            </S.ScrollTitleContainer>

            <S.ScrollGraphContainer
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <VictoryChart
                theme={VictoryTheme.material}
                width={data.length > 4 ? data.length * 80 : 350}
                padding={{ bottom: 80, left: 50, right: 15 }}
                height={350}
                domainPadding={25}
                style={{
                  background: {
                    width: "100%",
                  },
                }}
              >
                <VictoryAxis
                  animate={{
                    duration: 2000,
                    easing: "bounce",
                  }}
                  theme={VictoryTheme.material}
                  style={{
                    tickLabels: { fill: "#FB6C34" },
                    ticks: { stroke: "#FFF" },
                  }}
                />
                <VictoryAxis
                  animate={{
                    duration: 2000,
                    easing: "bounce",
                  }}
                  theme={VictoryTheme.material}
                  dependentAxis
                  style={{
                    tickLabels: { fill: "#FB6C34" },
                  }}
                />
                <VictoryBar
                  data={data}
                  x="formattedDate"
                  y="priceStock"
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                  }}
                  barRatio={0.8}
                  style={{
                    data: {
                      fill: "#fff",
                      stroke: "#FB6C34",
                      strokeWidth: 2,
                      width: 30,
                    },
                  }}
                />
              </VictoryChart>
            </S.ScrollGraphContainer>
          </>
        )}
      </S.Container>
    </TouchableWithoutFeedback>
  );
}
