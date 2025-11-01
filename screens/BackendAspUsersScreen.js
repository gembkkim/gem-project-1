import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import {
  executeAsp,
  executeNspGetSpArguments,
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../apis/apiService";

const BackendAspUsersScreen = () => {
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([]);
  const [loading, setLoading] = useState(true);

  // ASP 처리하기
  const aspFetchItems = async () => {
    setLoading(true);
    const args = {
      user_id: "gembkkim",
    };
    try {
      const data = await executeAsp(args);
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  // NSP 처리하기
  const nspFetchItems = async () => {
    setLoading(true);
    const args = {
      sp_name: "asp_users_u",
    };
    try {
      const data = await executeNspGetSpArguments(args);
      setItems1(data);

      var args1 = {};
      var newKey = "sp_ame";
      var newValue = "asp_users_u";
      args1 = { ...args1, [newKey]: newValue };

      for (var i = 0; i < data.length; i++) {
        // console.log(data[i]);
        console.log(data[i].argument, data[i].datatype);

        newKey = data[i].argument.replace("@", "");
        newValue = "gembkkim";
        args1 = { ...args1, [newKey]: newValue };

        // setData([...args1, newRow]); // 스프레드 문법으로 데이터 추가
      }
      console.log(args1);

      try {
        const data = await executeAsp(args1);
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch Nsp items1:", error);
    } finally {
      setLoading(false);
    }
  };

  // 모든 아이템 불러오기 (Read)
  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    aspFetchItems();
    nspFetchItems();
  }, []);

  // 아이템 추가 (Create)
  const handleAddItem = async () => {
    const newItem = {
      name: `New Item ${Date.now()}`,
      description: "Test Description",
    };
    try {
      await createItem(newItem);
      fetchItems(); // 목록 갱신
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  // 아이템 수정 (Update)
  const handleUpdateItem = async (id) => {
    const updatedData = {
      name: "Updated Name",
      description: "Updated Description",
    };
    try {
      await updateItem(id, updatedData);
      fetchItems(); // 목록 갱신
    } catch (error) {
      console.error(`Failed to update item ${id}:`, error);
    }
  };

  // 아이템 삭제 (Delete)
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      fetchItems(); // 목록 갱신
    } catch (error) {
      console.error(`Failed to delete item ${id}:`, error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>데이터 로딩 중...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>
        UserId: {item.user_id}, Name: {item.name}, Age: {item.age}, SexTy:
        {item.sex_ty}, Note: {item.note}
      </Text>
      <View style={styles.buttonGroup}>
        <Button title="Update" onPress={() => handleUpdateItem(item.id)} />
        <Button
          title="Delete"
          color="red"
          onPress={() => handleDeleteItem(item.id)}
        />
      </View>
    </View>
  );

  const renderItemNsp = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>
        Argument: {item.argument.toString()}, Datatype:
        {item.datatype.toString()}, Length:
        {item.length.toString()}, Inout: {item.inout.toString()}, Prec:
        {item.prec.toString()}, Scale: {item.scale.toString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Add New Item" onPress={handleAddItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderItem}
      />
      <Button title="ASP Processing" onPress={aspFetchItems} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderItem}
      />
      <Button title="NSP Processing" onPress={nspFetchItems} />
      <TextInput id="user_id" value="김봉균"></TextInput>
      <FlatList
        data={items1}
        keyExtractor={(item) => item.argument.toString()}
        // renderItem={renderItemNsp}
        renderItem=""
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    flex: 1,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: "row",
    width: 150,
    justifyContent: "space-between",
  },
});

export default BackendAspUsersScreen;
