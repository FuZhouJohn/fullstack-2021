import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => good + neutral + bad;
  const getAverage = () => (good - bad) / getAll();
  const getPositive = () => (good / getAll()) * 100;
  return (
    <>
      <h1>statistics</h1>
      {good + neutral + bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {getAll()}</p>
          <p>average {getAverage()}</p>
          <p>positive {`${getPositive()} %`}</p>
        </>
      )}
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  );
};

export default App;
