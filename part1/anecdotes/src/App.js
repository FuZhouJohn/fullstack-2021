import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  const [points, setPoints] = useState(
    new Array(10 + 1).join("0").split("").map(parseFloat)
  );
  const getCurrentPoint = (index) => points[index];

  const [selected, setSelected] = useState(0);
  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 7));
  };
  const handleVote = (index) => {
    const copy = [...points];
    copy[index] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {getCurrentPoint(selected)} votes</p>
      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </div>
  );
};

export default App;
