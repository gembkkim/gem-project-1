import React, { useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Button,
  TextInput,
  Text,
  Checkbox,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { Dropdown, MultiSelectDropdown } from "react-native-paper-dropdown";

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

const OPTIONS = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
const MULTI_SELECT_OPTIONS = [
  { label: "White", value: "white" },
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" },
];

const StyleScreen = () => {
  const [checked, setChecked] = useState(false);
  const [gender, setGender] = useState();
  const [colors, setColors] = useState([]);
  const inputRef = useRef(null); // ref 객체 생성, 초기값은 null

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // ref 객체의 .current 속성을 통해 TextInput에 접근
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView>
        <Text
          style={{
            fontSize: 24,
            height: 60,
            padding: 5,
            margin: 0,
            fontWeight: "bold",
            backgroundColor: "darkblue",
            color: "white",
          }}
        >
          React Native Paper
        </Text>
        <Button
          style={{ margin: 10 }}
          icon="camera"
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={handleFocus}
        >
          포커스하기
        </Button>
        <ScrollView>
          <View style={{ margin: 10 }}>
            <Dropdown
              label="Gender"
              placeholder="Select Gender"
              options={OPTIONS}
              value={gender}
              onSelect={setGender}
              mode="outlined"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Dropdown
              label="Gender"
              placeholder="Select Gender"
              options={OPTIONS}
              value={gender}
              onSelect={setGender}
              mode="outlined"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Dropdown
              label="Gender"
              placeholder="Select Gender"
              options={OPTIONS}
              value={gender}
              onSelect={setGender}
              mode="outlined"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Dropdown
              style={{ margin: 10 }}
              label="Gender"
              placeholder="Select Gender"
              options={OPTIONS}
              value={gender}
              onSelect={setGender}
              mode="flat"
            />
          </View>
          <View style={{ margin: 10 }}>
            <MultiSelectDropdown
              style={{ margin: 10 }}
              label="Colors"
              placeholder="Select Colors"
              options={MULTI_SELECT_OPTIONS}
              value={colors}
              onSelect={setColors}
              mode="outlined"
            />
          </View>
          <View style={{ margin: 10 }}>
            <MultiSelectDropdown
              style={{ margin: 10 }}
              label="Colors"
              placeholder="Select Colors"
              options={MULTI_SELECT_OPTIONS}
              value={colors}
              onSelect={setColors}
              mode="flat"
            />
          </View>
          {/* Basic Checkbox */}
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />

          {/* Checkbox.Item with a label */}
          <Checkbox.Item
            label="나는 아침밥을 먹었다. Accept Terms and Conditions"
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <TextInput
            ref={inputRef}
            style={{ margin: 10 }}
            label="사용자ID"
            mode="outlined"
          />
          <TextInput style={{ margin: 10 }} label="성별(Sex_Ty)" mode="flat" />
          <Button
            style={{ margin: 10 }}
            icon="camera"
            mode="text"
            buttonColor={theme.colors.error}
            onPress={() => console.log("에러 입니다")}
          >
            에러 입니다
          </Button>
          <Button
            style={{ margin: 10 }}
            icon="camera"
            mode="outlined"
            buttonColor={theme.colors.scrim}
            onPress={() => console.log("scrim")}
          >
            scrim
          </Button>
          <Button
            style={{ margin: 10 }}
            icon="camera"
            mode="contained"
            buttonColor={theme.colors.primary}
            onPress={() => console.log("primary")}
          >
            primary
          </Button>
          <Button
            style={{ margin: 10 }}
            mode="elevated"
            onPress={() => console.log("null 값")}
          >
            null 값
          </Button>
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default StyleScreen;
