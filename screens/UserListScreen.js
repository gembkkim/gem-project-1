import { FlatList, KeyboardAvoidingView, Alert, View } from "react-native";
import {
  Button,
  TextInput,
  Text,
  Checkbox,
  MD3LightTheme,
  PaperProvider,
  IconButton,
} from "react-native-paper";
import { asp } from "../apis/apiService";
import React, { useState, useEffect } from "react";
import InsertIcon from "../assets/insert-icon.svg";
import UpdateIcon from "../assets/update-icon.svg";
import DeleteIcon from "../assets/delete-icon.svg";
import styles from "../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { Dropdown, MultiSelectDropdown } from "react-native-paper-dropdown";
import { useIsFocused } from "@react-navigation/native";

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

const UserListScreen = ({ navigation }) => {
  const thisName = "▶ " + UserListScreen.name + " ::: ";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdS, setUserIdS] = useState("");

  useEffect(() => {
    setUserIdS("");
    handleSearchRows;
  }, []);

  const onChangeTextUserIdS = (userIdS) => {
    setUserIdS(userIdS);
  };

  const handleSearchRows = async () => {
    setLoading(true);
    try {
      const args = {
        sp_name: "asp_users_s",
        user_id_s: userIdS,
      };
      console.log(thisName + "args: " + JSON.stringify(args));
      const data = await asp(args);
      setItems(data);
      console.log(
        thisName + "handleInsertOrUpdateItem:" + JSON.stringify(data)
      );
      //fetchItems(); // 목록 갱신
    } catch (err) {
      console.err("Failed to update item", err);
    } finally {
      setLoading(false);
      console.log(thisName + "사용자 등록이 완료 되었습니다.");
    }
  };

  const handleDeleteRow = async (user_id) => {
    setLoading(true);

    Alert.alert(
      "사용자삭제",
      "정말로 사용자(" + user_id + ")를 삭제하시겠습니까?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              const args = {
                sp_name: "asp_users_d",
                user_id: user_id,
              };
              console.log(thisName + "args: " + JSON.stringify(args));
              const data = await asp(args);
              setItems(data);
              console.log(thisName + "handleDeleteRow:" + JSON.stringify(data));
              //fetchItems(); // 목록 갱신
            } catch (err) {
              console.err(thisName + "Failed to update item", err);
            } finally {
              setLoading(false);
              console.log(thisName + "사용자 삭제가 완료 되었습니다.");
              handleSearchRows;
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.viewRowContainer, { alignItems: "center" }]}>
      <Text
        style={{
          width: "65%",
          fontSize: 16,
        }}
        variant="bodyMedium"
      >
        {/* UserId: {item.user_id}, Name: {item.name}, Age: {item.age}, SexTy:
        {item.sex_ty}, Note: {item.note} */}
        {item.user_id} {item.name}
      </Text>
      <IconButton
        icon={() => <UpdateIcon />}
        style={{ width: "13%", backgroundColor: "deepskyblue" }}
        mode="contained"
        onPress={() =>
          navigation.navigate("UserInfo", {
            user_id: item.user_id,
            name: item.name,
            age: item.age,
            sex_ty: item.sex_ty,
            note: item.note,
          })
        }
      />
      <IconButton
        icon={() => <DeleteIcon />}
        style={{ width: "13%", backgroundColor: "deeppink" }}
        mode="contained"
        onPress={() => handleDeleteRow(item.user_id)}
      />
    </View>
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            height: 55,
            padding: 10,
            margin: 0,
            backgroundColor: "darkblue",
            color: "white",
          }}
          variant="headlineMedium"
        >
          사용자 목록
        </Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={[styles.viewTotalContainer, {}]}>
            <View style={[styles.viewRowContainer, { marginBottom: 10 }]}>
              <TextInput
                id="txtUserIdS"
                style={{ width: "100%" }}
                label="사용자ID"
                mode="outlined"
                placeholder="사용자ID 검색어 입력..."
                value={userIdS}
                onChangeText={onChangeTextUserIdS}
                right={
                  <TextInput.Icon icon="magnify" onPress={handleSearchRows} />
                }
              />
            </View>
            <View style={[styles.viewColumnContainer, { marginBottom: 100 }]}>
              {/* <View style={[styles.viewColumnContainer, {paddingBottom: 100}]}> */}
              {/* <View style={[styles.viewColumnContainer, {}]}> */}
              <FlatList
                // contentContainerStyle={{
                //   display: "flex",
                //   flexGrow: 1,
                // }}
                data={items}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => item.user_id}
                ItemSeparatorComponent={() => (
                  <View style={styles.renderSeparator} />
                )}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={[styles.viewTotalContainer, { flex: 0 }]}>
            <View
              style={[
                styles.viewColumnContainer,
                {
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              ]}
            >
              <Button
                icon="plus-circle"
                style={{
                  // height: 50,
                  // marginTop: 20,
                  // marginBottom: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                mode="contained"
                onPress={() =>
                  navigation.navigate("UserInfo", {
                    user_id: "",
                    name: "",
                    age: "",
                    sex_ty: "",
                    note: "",
                  })
                }
              >
                사용자 추가하기
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default UserListScreen;
