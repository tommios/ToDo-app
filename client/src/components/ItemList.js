import React, { useState, useEffect } from "react";
import * as todoApi from "../api";
import { Link } from "react-router-dom";
import { Layout, Card, List, Button } from "antd";
import { PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

function ItemList(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    todoApi.getAllTodo().then((res) => {
      setTodos(res.data);
    });
  }, []);

  return (
    <Layout>
      <Header className="header">ToDo App</Header>

      <Layout>
        <Sider>Sider</Sider>

        <Content>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 3,
              xl: 4,
              xxl: 5,
            }}
            dataSource={todos}
            renderItem={(item) => (
              <List.Item>
                <div className="site-card-border-less-wrapper">
                  <Card
                    title={item.title}
                    bordered={false}
                    style={{ width: 300 }}
                  >
                    {item.body}
                    <div>
                      <Button type="link" danger>
                        VIEW
                      </Button>
                      <Button type="link" danger>
                        EDIT
                      </Button>
                      <Button type="link" danger>
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </Card>
                </div>
              </List.Item>
            )}
          />
          <Link to="/addTodo" className="btn btn-add-todo">
            <PlusCircleOutlined style={{ fontSize: "4em" }} />
          </Link>
          {/* <Button
            danger
            shape="circle"
            size="large"
            className="btn-add-todo"
            icon={<PlusOutlined />}
            onClick={addTodoRoute}
          /> */}
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default ItemList;
