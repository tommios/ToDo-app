import React, { useState } from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

const TodoForm = ({ saveTodo }) => {
  const [title, setTitle] = useState("");

  const [desc, setDesc] = useState("");

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeDesc = (event) => {
    setDesc(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="todo-form">
      <h2>Add Todo:</h2>
      <Form
        className="ant-form ant-form-horizontal ant-form-large"
        //   onSubmit={(event) => {
        //     event.preventDefault();
        //     saveTodo(value);
        //   }}
      >
        <Input
          placeholder="Todo Title"
          onChange={handleChangeTitle}
          value={title}
        />

        <div style={{ margin: "24px 0" }} />

        <TextArea
          value={desc}
          onChange={handleChangeDesc}
          placeholder="Todo Description"
          autoSize={{ minRows: 3 }}
        />
      </Form>
    </div>
  );
};

export default TodoForm;
