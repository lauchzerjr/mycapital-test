import React, { useCallback, useMemo, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Divider } from "native-base";

import { Card, CardProps } from "../../components/Card/Card";
import { Input } from "../../components/Input/Input";
import * as S from "./Search.styles";
import { ListEmptyComponent } from "../../components/ListEmptyComponent/ListEmptyComponent";

export function Search() {
  const [data, setData] = useState<CardProps[]>([] as CardProps[]);
  const [search, setSearch] = useState("");

  const stockFilter = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return data.filter((item) =>
      item.items.some((item) =>
        item.nameStock.toLowerCase().includes(lowerSearch)
      )
    );
  }, [search, data]);

  const { getItem, setItem } = useAsyncStorage("@mycapitaltest:stocks");

  async function handleFetchData() {
    const response = await getItem();
    const data = response ? JSON.parse(response) : [];
    setData(data);
  }

  const renderItem = ({ item }) => {
    return <Card formattedDate={item.formattedDate} items={item.items} />;
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchData();
    }, [])
  );

  return (
    <S.Container>
      <S.Title>Pesquisar ação</S.Title>

      <Input
        label=""
        fullWidth
        placeholder="Pesquise por nome da ação"
        value={search}
        onChangeText={setSearch}
      />

      <S.FlatListStocks
        data={search.length >= 1 ? stockFilter : data}
        keyExtractor={(item: CardProps) => item.formattedDate}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListEmptyComponent={() => <ListEmptyComponent />}
        ItemSeparatorComponent={() => {
          return (
            <Divider
              bg="gray.400"
              thickness="1"
              my="1"
              orientation="horizontal"
              mb={"3"}
              mt={"3"}
            />
          );
        }}
      />
    </S.Container>
  );
}