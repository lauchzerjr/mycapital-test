import React, { useEffect, useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import * as S from "./DatePicker.styles";
import { useToast } from "native-base";

type DatePickerProps = {
  onDateSelected: (date: Date) => void;
};

type Holiday = {
  date: string;
  name: string;
};

export function DatePickerComponent({ onDateSelected }: DatePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const toast = useToast();

  const years = [ 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023 ];
  const cache = {};

  function isHoliday(date: Date): boolean {
    const formattedDate = date.toISOString().substring(0, 10);
    return holidays.some((holiday) => holiday.date === formattedDate);
  }

  function handleChangeDate(event: DateTimePickerEvent, date?: Date) {
    setShowPicker(false);

    if (date !== undefined && !isHoliday(date)) {
      setSelectedDate(date);
      onDateSelected(date);
    } else if (date !== undefined) {
      toast.show({
        title: "A data selecionada é um feriado, selecione outra.",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    async function getHoliday() {
      const promises = years.map(async (year) => {
        if (cache[year]) {
          return cache[year];
        } else {
          const response = await fetch(
            `https://brasilapi.com.br/api/feriados/v1/${year}`
          );
          const data = await response.json();
          cache[year] = data;
          return data;
        }
      });

      const holidaysForYear = await Promise.all(promises);
      const holidays = holidaysForYear.flat();

      setHolidays(holidays);
    }

    getHoliday().catch(console.error);
  }, []);

  return (
    <>
      <S.ButtonDatePicker onPress={() => setShowPicker(true)}>
        <S.TitleDatePicker>Data da compra</S.TitleDatePicker>
        <FontAwesome name="calendar" size={24} color="#FB6C34" />
      </S.ButtonDatePicker>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={handleChangeDate}
          maximumDate={new Date()}
        />
      )}
      
    </>
  );
}
