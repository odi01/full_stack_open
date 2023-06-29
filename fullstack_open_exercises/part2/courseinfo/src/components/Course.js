const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ parts }) => (
    parts.map((part) => <Part key={part.id} part={part} />)
);

const Part = ({ part }) => (
    <p>
    {part.name} {part.exercises}
  </p>
);

// const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Course = (course) => {
  return (
    <div>
      <Header course={course.course} />
      <Content parts={course.course.parts}/>
    </div>
  );
};

export default Course;
