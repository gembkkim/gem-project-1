import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./screens/MainScreen";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { PaperProvider } from "react-native-paper";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
// 응용 화면들...
import LoginScreen from "./screens/LoginScreen";
import BackendUsersScreen from "./screens/BackendUsersScreen";
import BackendAspUsersScreen from "./screens/BackendAspUsersScreen";
import TestScreen from "./screens/TestScreen";
import StyleScreen from "./screens/StyleScreen";
import UserListScreen from "./screens/UserListScreen";
import UserInfoScreen from "./screens/UserInfoScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen
            options={{ headerShown: false }}
            name="UserInfo"
            component={UserInfoScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UserList"
            component={UserListScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Test"
            component={TestScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BackendAspUsers"
            component={BackendAspUsersScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Style"
            component={StyleScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="BackendUsers"
            component={BackendUsersScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Main"
            component={MainScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
