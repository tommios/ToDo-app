import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, List, Divider } from "antd";
let timer;
function ItemList(props) {
  const [count, setCount] = useState(0);
  const [anotherCount, setAnotherCount] = useState(0);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("Each time", { count });
    if (!(count % 10)) {
      setAnotherCount(count);
    }
  });

  useEffect(() => {
    console.log("Did mount", { count });
  }, []);

  useEffect(() => {
    console.log("count%10", { anotherCount });
  }, [anotherCount]);

  useEffect(() => {
    timer = setInterval(() => console.log("Hi"), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    let data = axios
      .get("http://localhost:8000/todos")
      .then((res) => {
        setTodos(res.data);
        // console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={todos}
      renderItem={(item) => (
        <List.Item>
          <div style={{ padding: "30px" }}>
            <Card title={item.title} bordered={false} style={{ width: 300 }}>
              {item.body}
            </Card>
          </div>
        </List.Item>
      )}
    />
  );
}

export default ItemList;
