import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { asp } from "../apis/apiService";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import InsertIcon from "../assets/insert-icon.svg";
import UpdateIcon from "../assets/update-icon.svg";
import DeleteIcon from "../assets/delete-icon.svg";
import styles from "../styles/global";

const TestScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdS, setUserIdS] = useState("gem");
  const [userId, setUserId] = useState("1212");
  const [name, setName] = useState("12");
  const [age, setAge] = useState(12);
  const [sexTyOpen, setSexTyOpen] = useState(false);
  const [sexTy, setSexTy] = useState(12);
  const [sexTyItems, setSexTyItems] = useState([
    { label: "", value: "" },
    { label: "남성", value: "M" },
    { label: "여성", value: "F" },
  ]);
  const [note, setNote] = useState("1212");

  useEffect(() => {
    handleSearch;
  }, []);

  const onChangeTextUserIdS = (userIdS) => {
    setUserIdS(userIdS);
  };
  const onChangeTextUserId = (userId) => {
    setUserId(userId);
  };
  const onChangeTextName = (name) => {
    setName(name);
  };
  const onChangeTextSexTy = (sexTy) => {
    setSexTy(sexTy);
  };
  const onChangeTextNote = (note) => {
    setNote(note);
  };

  // 2. Create (데이터 생성)
  const createItem = async (newItem) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdItem = await response.json();
      return createdItem;
    } catch (error) {
      console.error("Create Item Error: ", error);
      throw error;
    }
  };

  // 아이템 수정 (Update)

  // const handleUpdateItem = async (id) => {

  const handleJSONStudy = () => {
    console.log("JSON Study");

    let s = {
      name: "John",
      age: 30,
      isAdmin: false,
      courses: ["html", "css", "js"],
      wife: null,
    };

    // 객체를 JSON 문자열로 변환
    let json = JSON.stringify(s);
    console.log(json);

    console.log(JSON.stringify(s, ["name", "age"]));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const args = {
        sp_name: "asp_users_s",
        user_id_s: userIdS,
      };
      console.log("▶ TestScreen ::: args: " + JSON.stringify(args));
      // const result = await aspUsers(args);
      const data = await asp(args);
      setItems(data);
      console.log(
        "▶ TestScreen ::: handleInsertOrUpdateItem:" + JSON.stringify(data)
      );
      //fetchItems(); // 목록 갱신
    } catch (err) {
      console.err("Failed to update item", err);
    } finally {
      setLoading(false);
      console.log("▶ TestScreen ::: 사용자 등록이 완료 되었습니다.");
    }
  };

  const handleInsertOrUpdateItem = async () => {
    //사용자 등록
    // Alert.alert(
    //   "사용자등록(TestScreen)",
    //   "사용자 정보를 등록 혹은 수정 하시겠습니까?",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => {
    //         console.log("▶ TestScreen ::: 사용자 등록이 취소 되었습니다.");
    //       },
    //       style: "cancel", // On iOS, this gives a distinct style
    //     },
    //     {
    //       text: "Ok",
    //       onPress: () => {
    //       },
    //     },
    //   ]
    // );

    try {
      const args = {
        sp_name: "asp_users_u",
        user_id: userId,
        name: name,
        age: age,
        sex_ty: sexTy,
        note: note,
      };
      console.log("▶ TestScreen ::: args: " + args);
      // const result = await aspUsers(args);
      const result = await asp(args);
      console.log(
        "▶ TestScreen ::: handleInsertOrUpdateItem:" + JSON.stringify(result)
      );
      //fetchItems(); // 목록 갱신
    } catch (err) {
      console.err("Failed to update item", err);
    } finally {
      console.log("▶ TestScreen ::: 사용자 등록이 완료 되었습니다.");
    }
  };

  const onPressInsertOrUpdate = () => {};

  const renderItem = ({ item }) => (
    <View style={[styles.viewRowContainer, { alignItems: "center" }]}>
      <Text style={[styles.textWrapCon, { width: "73%" }]}>
        UserId: {item.user_id}, Name: {item.name}, Age: {item.age}, SexTy:
        {item.sex_ty}, Note: {item.note}
      </Text>
      <Pressable
        style={[styles.buttonCon, { backgroundColor: "deepskyblue" }]}
        onPress={() => console.log("수정 Click Button Pressed")}
      >
        {/* <Text style={[styles.buttonTextCon, {}]}>수정</Text> */}
        <Text style={[styles.buttonTextCon, {}]}>
          <UpdateIcon />
        </Text>
      </Pressable>
      <Pressable
        style={[styles.buttonCon, { backgroundColor: "deeppink" }]}
        onPress={() => console.log("삭제 Click Button Pressed")}
      >
        {/* <Text style={[styles.buttonTextCon, {}]}>삭제</Text> */}
        <Text style={[styles.buttonTextCon, {}]}>
          <DeleteIcon />
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeAreaViewContainer, {}]}>
      <Text style={[styles.appTitleContainer, {}]}>사용자 등록</Text>
      {/* <KeyboardAvoidingView style={styles.container} behavior="padding"> */}
      <View style={[styles.viewTotalContainer, {}]}>
        <View style={[styles.viewRowContainer, {}]}>
          <Text style={[styles.labelCon, {}]}>사용자ID</Text>
          <TextInput
            id="txtUserIdS"
            style={[styles.textInputCon, { width: "65%" }]}
            onChangeText={onChangeTextUserIdS}
            value={userIdS}
            placeholder="사용자ID 검색어 입력..."
          />
          <Pressable
            id="search"
            style={[styles.buttonCon, {}]}
            onPress={handleSearch}
          >
            <Text style={[styles.buttonTextCon, {}]}>검색</Text>
          </Pressable>
        </View>
        <View style={[styles.viewColumnContainer, {}]}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <View style={[styles.viewColumnContainer, { margin: 10 }]}>
        <TextInput
          id="txtUserId"
          style={[styles.textInputCon, {}]}
          onChangeText={onChangeTextUserId}
          value={userId}
          placeholder="사용자ID"
        />
        <TextInput
          id="txtName"
          style={[styles.textInputCon, {}]}
          onChangeText={onChangeTextName}
          value={name}
          placeholder="성명"
          _i
        />
        <TextInput
          id="txtAge"
          keyboardType="numeric"
          style={[styles.textInputCon, {}]}
          onChangeText={(age) => {
            setAge(age.replace(/[^0-9]/g, ""));
            // numberOnly 변수에 숫자만 저장됨
            // 필요에 따라 상태값에 저장
          }}
          value={age}
          placeholder="나이"
        />
        <DropDownPicker
          // containerStyle={
          //   sexTyOpen ? styles.dropDownContOpen : styles.dropDownContClose
          // }
          // style={styles.dropDownStyle}
          // dropDownContainerStyle={styles.dropDownContainerStyle}
          // placeholderStyle={{ height: 35 }}
          // arrowIconStyle={styles.arrowIconStyle}
          // onChangeValue={(value) => {
          //   filterArrByProvince(value);
          // }}
          style={[styles.textInputCon, { marginBottom: 15 }]}
          // dropDownContainerStyle={{
          //   color: "gray",
          //   borderColor: "gray",
          //   // height: 40,
          //   // minHeight: 200,
          // }}
          // containerStyle={{ height: 60, padding: 0 }}
          placeholder="성별 선택"
          // placeholderStyle={{ height: 35 }}
          open={sexTyOpen}
          value={sexTy}
          items={sexTyItems}
          setOpen={setSexTyOpen}
          setValue={setSexTy}
          setItems={setSexTyItems}
        />
        <TextInput
          id="txtNote"
          style={[styles.textInputCon, {}]}
          onChangeText={onChangeTextNote}
          value={note}
          placeholder="비고"
        />
        <Pressable
          id="InsertOrUpdate"
          style={[styles.buttonCon, {}]}
          onPress={handleInsertOrUpdateItem}
        >
          <Text style={[styles.buttonTextCon, {}]}>등록 혹은 수정</Text>
        </Pressable>
        <Pressable
          id="jsonStudy"
          style={[styles.buttonCon, {}]}
          onPress={handleJSONStudy}
        >
          <View style={[styles.viewColumnContainer, { alignItems: "center" }]}>
            <InsertIcon />
          </View>
        </Pressable>
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default TestScreen;
