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
// import RNCameraScreen from "./screens/RNCameraScreen";

// 예시 화면 컴포넌트
function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    // <PaperProvider theme={theme}>
    <Provider store={store}>
    <NavigationContainer>
    {/* <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator> */}
      <Stack.Navigator initialRouteName="UserList">
          <Stack.Screen
            options={{ headerShown: false }}
            name="RNCamera"
            component={RNCameraScreen}
          />
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
    // </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
