import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
// 설치 : npm install react-native-safe-area-context
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import InputForm1 from "../components/InputForm1";
import TodoItem from "../components/TodoItem";
import { useSelector } from "react-redux";
import React from "react";

const MainScreen = () => {
  const todos = useSelector((state) => state.todo.todos);
  const todoTask = todos.filter((item) => item.state === "todo");
  const completeTask = todos.filter((item) => item.state === "done");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle="dark-content" // light-content, dark-content, default
          showHideTransition="fade" // fade, slide, none
          hidden={false} // true, false
        />
        <Text style={styles.pageTitle}>ToDo App</Text>
        <View style={styles.listView}>
          <Text style={styles.listTitle}>할 일</Text>
          {todoTask.length !== 0 ? (
            <FlatList
              data={todoTask}
              renderItem={({ item }) => <TodoItem {...item} />}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.emptyListText}>할일이 없습니다.</Text>
          )}
        </View>
        <View style={styles.separator}></View>
        <View style={styles.listView}>
          <Text style={styles.listTitle}>완료된 일</Text>
          {completeTask.length !== 0 ? (
            <FlatList
              data={completeTask}
              renderItem={({ item }) => <TodoItem {...item} />}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text style={styles.emptyListText}>완료된일이 없습니다.</Text>
          )}
        </View>
        <InputForm1 />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F7F8FA",
  },
  pageTitle: {
    marginBottom: 35,
    paddingHorizontal: 15,
    fontSize: 36,
    fontWeight: "600",
  },
  separator: {
    marginHorizontal: 10,
    marginTop: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  listView: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "#3A3D42",
    fontSize: 30,
    fontWeight: "500",
  },
  emptyListText: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    lineHeight: 20,
    color: "#737373",
  },
});

export default MainScreen;
