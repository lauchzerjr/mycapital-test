import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";

const { Screen, Navigator } = createBottomTabNavigator();

import { Home } from "../pages/Home/Home";
import { Search } from "../pages/Search/Search";

export const TabRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: "#52525b",
        tabBarActiveTintColor: "#f4f4f5",
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          backgroundColor: "#18181b",
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />
      <Screen
        name="search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
          tabBarLabel: "Pesquisa",
        }}
      />
      {/* <Screen
        name="sport"
        component={Sport}
        options={{ tabBarButton: () => null }}
      /> */}
    </Navigator>
  );
};
