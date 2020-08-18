import React from "react";

const A = (props) => {
  const handleClick = (e) => {
    console.log(e);

    props.onClick({
      title: "testTask",
      body: "test content",
      completed: "false",
    });
  };

  return (
    <>
      <button onClick={handleClick}>Click ME</button>
    </>
  );
};

const B = (props) => {
  return (
    <A
      onClick={(data) => {
        console.log(data);
        props.onSomething(data);
      }}
    />
  );
};

const C = () => {
  const handleClick = (data) => {
    console.log("HERE", data);
  };
  return <B onSomething={(data) => handleClick(data)} />;
};

export default C;
