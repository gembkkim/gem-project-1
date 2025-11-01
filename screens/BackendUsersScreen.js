// App.js (React Native / Expo)

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  FlatList,
} from "react-native";

const API_URL = "http://192.168.45.122:3000"; // ⚠️ 이 부분을 반드시 PC의 실제 IP 주소와 Express 포트로 변경해야 합니다.

const BackendUsersScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      console.log("Response Status:", response);

      // HTTP 상태 코드가 200 범위가 아니면 에러를 던집니다.
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log("API Response:", result);
      setData(result || []); // 응답 객체의 'data' 배열을 상태에 저장합니다.
      // console.log("aaaaaaaaaa aaaaaa " + result[0].user_id);
    } catch (err) {
      console.error("Fetching Error: ", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 한 번 API를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>데이터를 불러오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>API 호출 중 오류 발생:</Text>
        <Text>{error}</Text>
        <Button title="다시 시도" onPress={fetchData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Express API에서 가져온 데이터</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            4
            <Text style={styles.itemText}>
              사용자ID: {item.user_id.toString()}
            </Text>
            <Text style={styles.itemText}>Name: {item.name.toString()}</Text>
            <Text style={styles.itemText}>Age: {item.age}</Text>
            <Text style={styles.itemText}>SexTy: {item.sex_ty.toString()}</Text>
            <Text style={styles.itemText}>Note: {item.note.toString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default BackendUsersScreen;
