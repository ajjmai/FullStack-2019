import React from "react";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = ({ parts }) => {
  const rows = () => parts.map(part => <Part key={part.id} part={part} />);

  return <div>{rows()}</div>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.map(part => part.exercises).reduce((s, p) => s + p);
  console.log(total);
  return <p>Yhteensä {total} tehtävää</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
