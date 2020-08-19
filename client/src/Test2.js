import React from "react";

const Item01 = (props) => {
  const handleClick = () => {
    props.onSomething02({
      title: "TestTitle",
      body: "TestBody",
      completed: "true",
    });
  };
  return (
    <>
      <button onClick={handleClick}>Button01</button>
    </>
  );
};

const Item02 = (props) => {
  return (
    <Item01
      onSomething02={(data) => {
        props.onSomething03(data);
      }}
    />
  );
};

const Item03 = () => {
  const handleClick = (data) => {
    console.log("Item03 data: ", data);
  };
  return (
    <Item02
      onSomething03={(data) => {
        handleClick(data);
      }}
    />
  );
};

export default Item03;
