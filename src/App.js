import React, {useEffect, useState} from "react";
import "./App.css";
import Die from "./components/Die.js";
// import dieData from "./dieData.js";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [tenzies, setTenzies] = useState(false);
  const [dice, setDice] = useState(roledDice());
  const [start, setStart] = useState(false);

  useEffect(() => {
    const allStatic = dice.every((die) => die.isStatic);
    const sameValue = dice.every((die) => die.value === dice[0].value);
    if (allStatic && sameValue) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [dice]);

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

  function startRoll() {
    if (start === false) {
      setStart(true);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isStatic
            ? die
            : {...die, value: Math.ceil(Math.random() * 6)};
        })
      );
      setTimeout(startRoll, 1000);
    }
  }

  function newGame() {
    setTenzies(false);
    setDice(roledDice);
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? {...die, isStatic: !die.isStatic} : die;
      })
    );
  }

  const dieElements = dice.map((die) => (
    <Die key={die.id} obj={die} holdFunc={() => hold(die.id)} />
  ));
  return (
    <div className='App'>
      <main>
        {tenzies && <Confetti />}
        <h1 className='title'>Tenzies</h1>
        <p className='rules'>
          Click each die to freeze its value between rolls. Freeze all dice with
          the same value to win.
        </p>
        <div className='dice-container'> {dieElements}</div>
        <button
          className={`btn ${tenzies ? `newGame` : `roll`}`}
          onClick={tenzies ? newGame : startRoll}
        >
          {tenzies ? `New Game` : `Start`}
        </button>
      </main>
    </div>
  );
}

export default App;
