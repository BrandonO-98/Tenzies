import React, {useState} from "react";
import "./App.css";
import Die from "./components/Die.js";
// import dieData from "./dieData.js";
import {nanoid} from "nanoid";

function App() {
  const [Dice, setDice] = useState(roledDice());

  function roll() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isStatic
          ? die
          : {...die, value: Math.ceil(Math.random() * 6)};
      })
    );
  }

  function roledDice() {
    const newRoll = [];
    for (let i = 0; i < 10; i++) {
      newRoll.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isStatic: false,
      });
    }
    return newRoll;
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        console.log(id);
        return die.id === id ? {...die, isStatic: !die.isStatic} : die;
      })
    );
  }
  const dieElements = Dice.map((die) => (
    <Die key={die.id} obj={die} holdFunc={() => hold(die.id)} />
  ));
  return (
    <div className='App'>
      <main>
        <h1 className='title'>Tenzies</h1>
        <p className='rules'>
          Roll until all dice are the same. Click each die to freeze its value
          between rolls.
        </p>
        <div className='dice-container'> {dieElements}</div>
        <button onClick={roll}>Roll</button>
      </main>
    </div>
  );
}

export default App;
