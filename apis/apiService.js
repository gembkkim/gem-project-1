// apiService.js (API 호출 로직)
import { API_BASE_URL } from "../constants/constants";

const logYn = false;

// 0. Stored Procedure 처리
const executeAsp = async (args) => {
  try {
    const response = await fetch(API_BASE_URL + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    // HTTP 상태 코드가 200 범위가 아닐 경우 에러 처리
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("ASP Fetch Items Error: ", error);
    throw error;
  }
};

// 0. Stored Procedure 처리
const executeNspGetSpArguments = async (args) => {
  try {
    const response = await fetch(API_BASE_URL + "/args", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });

    // HTTP 상태 코드가 200 범위가 아닐 경우 에러 처리
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ASP Fetch Items Error: ", error);
    throw error;
  }
};

// 1. Read (데이터 조회)
const getItems = async () => {
  try {
    const response = await fetch(API_BASE_URL);

    // HTTP 상태 코드가 200 범위가 아닐 경우 에러 처리
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Items Error: ", error);
    throw error;
  }
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

// 3. Update (데이터 수정)
const updateItem = async (id, updatedItem) => {
  try {
    // API 엔드포인트가 /api/items/:id 형식이라고 가정
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 서버가 업데이트된 객체를 반환한다고 가정
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Update Item Error: ", error);
    throw error;
  }
};

// SP 호출 : aspUsers*
const aspUsers = async (args) => {
  const funcName = "■ " + "aspUsers";
  if (logYn) console.log(funcName + "::: ::: args: " + JSON.stringify(args));
  try {
    const response = await fetch(API_BASE_URL + "/aspUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    console.log("1 args: " + JSON.stringify(args));
    console.log(response);
    if (!response.ok) {
      console.log("1-1");
      throw new Error(`HTTP error! status: ${response.status}`);
      console.log("1-2");
    }
    console.log("2");

    // 서버가 업데이트된 객체를 반환한다고 가정
    const result = await response.json();
    console.log("3");
    if (logYn) console.log(funcName + "::: result: " + JSON.stringify(result));
    return result;
  } catch (error) {
    console.error(funcName + "::: Item Error: ", error);
    throw error;
  }
};

// 범용 SP 호출 : asp*
const asp = async (args) => {
  const funcName = "■■ " + "asp";
  if (logYn) console.log(funcName + "::: ::: args: " + JSON.stringify(args));
  try {
    const response = await fetch(API_BASE_URL + "/asp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 서버가 업데이트된 객체를 반환한다고 가정
    const result = await response.json();
    if (logYn || true)
      console.log(funcName + "::: result: " + JSON.stringify(result));
    return result;
  } catch (error) {
    if (logYn) console.error(funcName + "::: Item Error: ", error);
    throw error;
  }
};

// 4. Delete (데이터 삭제)
const deleteItem = async (id) => {
  try {
    // API 엔드포인트가 /api/items/:id 형식이라고 가정
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 삭제 성공 시 보통 빈 응답 또는 성공 메시지를 받음
    // 이 예시에서는 204 No Content 또는 빈 JSON 응답을 가정합니다.
    return response.status === 204 ? null : response.json();
  } catch (error) {
    console.error("Delete Item Error: ", error);
    throw error;
  }
};

export {
  executeAsp,
  executeNspGetSpArguments,
  getItems,
  createItem,
  updateItem,
  deleteItem,
  aspUsers,
  asp,
};
