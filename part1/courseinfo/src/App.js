import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.info.name} {props.info.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part info={part}></Part>
      ))}
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const course_parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course}></Header>
      <Content parts={course_parts}></Content>
      <Total parts={course_parts}></Total>
    </div>
  );
};

export default App;
