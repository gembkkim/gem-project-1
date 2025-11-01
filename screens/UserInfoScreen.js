import { Alert, BackHandler, KeyboardAvoidingView, View } from "react-native";
import {
  Button,
  TextInput,
  Text,
  MD3LightTheme,
  PaperProvider,
  IconButton,
} from "react-native-paper";
import { asp } from "../apis/apiService";
import { StatusBar } from "expo-status-bar";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/global";
import { Dropdown, MultiSelectDropdown } from "react-native-paper-dropdown";
import GobackIcon from "../assets/goback.svg";
import InsertIcon from "../assets/insert-icon.svg";
import UpdateIcon from "../assets/update-icon.svg";

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

const SEX_TY_OPTIONS = [
  { label: "", value: "" },
  { label: "남성", value: "M" },
  { label: "여성", value: "F" },
];

const UserInfoScreen = ({ route }) => {
  const thisName = "▶ " + UserInfoScreen.name + " ::: ";
  const navigation = useNavigation();
  console.log(thisName + "route.params: " + JSON.stringify(route.params));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(route.params.user_id || "");
  const [name, setName] = useState(route.params.name || "");
  const [age, setAge] = useState(
    route.params.age ? String(route.params.age) : ""
  );
  const [sexTy, setSexTy] = useState(route.params.sex_ty || "");
  const [note, setNote] = useState(route.params.note || "");
  const [enableInputYn, setEnableInputYn] = useState(true);

  useEffect(() => {
    if (route.params.user_id.toString() !== "") setEnableInputYn(false);
    handleInsertRowOrUpdateRow;
    // 백 버튼 누름을 처리하는 사용자 정의 로직 : 기본 동작(예: 앱 종료)을 방지하려면 true를 반환, 기본 동작을 허용하려면 false를 반환
    BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert("알림", "우상단 뒤로가기 버튼을 사용 하십시오.");
      return true;
    });
  }, []);

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

  const handleInsertRowOrUpdateRow = async () => {
    setLoading(true);

    if (userId.toString() === "") {
      console.log(thisName + "사용자ID가 입력되지 않았습니다.");
      return;
    }

    try {
      const args = {
        sp_name: "asp_users_u",
        user_id: userId,
        name: name,
        age: age,
        sex_ty: sexTy,
        note: note,
      };
      console.log(thisName + "args: " + JSON.stringify(args));
      const data = await asp(args);
      setItems(data);
      console.log(
        thisName + "handleInsertRowOrUpdateRow:" + JSON.stringify(data)
      );
      //fetchItems(); // 목록 갱신
    } catch (err) {
      console.err("Failed to update item", err);
    } finally {
      setLoading(false);
      console.log(thisName + "사용자 등록이 완료 되었습니다.");
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.viewRowContainer, {}]}>
          <View style={{ width: "*", backgroundColor: "darkblue" }}>
            <IconButton
              icon="arrow-left"
              iconColor="white"
              containerColor="darkblue"
              mode="contained"
              onPress={() => navigation.goBack()}
            />
          </View>
          <Text
            style={{
              fontSize: 24,
              width: "84%",
              height: 55,
              paddingTop: 10,
              margin: 0,
              backgroundColor: "darkblue",
              color: "white",
            }}
            variant="headlineMedium"
          >
            사용자 정보
          </Text>
        </View>
        {/* </View> */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={[styles.viewTotalContainer, {}]}>
            <View style={[styles.viewColumnContainer, {}]}>
              <TextInput
                id="txtUserId"
                style={{ width: "100%", marginBottom: 5 }}
                label="사용자ID"
                mode="outlined"
                placeholder="사용자ID"
                value={userId}
                onChangeText={onChangeTextUserId}
                editable={enableInputYn}
              />
              <TextInput
                id="txtName"
                style={{ width: "100%", marginBottom: 5 }}
                label="성명"
                mode="outlined"
                placeholder="성명"
                value={name}
                onChangeText={onChangeTextName}
              />
              <TextInput
                id="txtAge"
                style={{ width: "100%", marginBottom: 5 }}
                label="나이"
                mode="outlined"
                placeholder="나이"
                value={age}
                // onChangeText={onChangeTextAge}
                onChangeText={(age) => {
                  setAge(age.replace(/[^0-9]/g, ""));
                }}
              />
              <View style={{ marginBottom: 5 }}>
                <Dropdown
                  id="cbxSexTy"
                  label="성별"
                  placeholder="성별 선택..."
                  options={SEX_TY_OPTIONS}
                  value={sexTy}
                  onSelect={onChangeTextSexTy}
                  mode="outlined"
                />
              </View>
              <TextInput
                id="txtNote"
                style={{ width: "100%", marginBottom: 5 }}
                label="비고"
                mode="outlined"
                placeholder="비고"
                value={note}
                onChangeText={onChangeTextNote}
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
                onPress={handleInsertRowOrUpdateRow}
              >
                사용자 등록 혹은 수정
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default UserInfoScreen;
