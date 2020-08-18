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

  const handleClick2 = (e) => {
    console.log(e);

    props.onClick({
      title: "testTask",
      body: "test content",
      completed: "false",
    });
  };

  const handleMouse = (e) => {
    handleClick();
  };
  return (
    <>
      <button onClick={handleClick2} onMouseEnter={handleMouse}>
        Click ME TOO
      </button>
      <button onClick={handleClick} onMouseEnter={handleMouse}>
        Click ME
      </button>
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

// const D = (props) => {
//   const handleClickDDD = (e) => {
//     console.log("DDD: ", e);
//   };
//   return <C onNext={data} myTestVal={12312412334} />;
// };

export default C;
