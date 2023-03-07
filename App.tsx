import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <StatusBar style="light" translucent />
      <Routes />
    </NativeBaseProvider>
  );
}
