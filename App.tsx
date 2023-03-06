import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar style="light" translucent/>
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#060606',
    alignItems: "center",
    justifyContent: "center",
  },
});
