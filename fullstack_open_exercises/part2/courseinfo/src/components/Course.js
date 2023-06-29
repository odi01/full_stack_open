const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const SumCalculation = (parts) => {
  return parts
    .map((part) => part.exercises)
    .reduce((prev, curr) => prev + curr);
};

const Total = ({ parts }) => (
  <p>
    <b>Total of {SumCalculation(parts)} exercises</b>
  </p>
);

const Course = (course) => {
  return (
    <div>
      <Header course={course.course} />
      <Content parts={course.course.parts} />
      <Total parts={course.course.parts} />
    </div>
  );
};

export default Course;
