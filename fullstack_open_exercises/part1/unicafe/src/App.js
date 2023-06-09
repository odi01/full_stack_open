import { useState } from "react";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = (props) => (
  <tr>
    <td>
      {props.text} {props.value}
    </td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <table>
        <tbody>
          {total !== 0 ? (
            <>
              <Statistics text="good" value={good} />
              <Statistics text="neutral" value={neutral} />
              <Statistics text="bad" value={bad} />
              <Statistics text="all" value={total} />
              <Statistics text="average" value={total / 3} />
              <Statistics text="positive" value={(good / total) * 100 + "%"} />
            </>
          ) : (
            <tr>
              <td>No feedback given</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
