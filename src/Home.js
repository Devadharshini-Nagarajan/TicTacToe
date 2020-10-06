import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState("");
  const [gridValue, setGridValue] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const reset = () => {
    setGridValue([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setWinner("");
    setTurn("X");
  };
  const Square = ({ updateGrid, first, second, value }) => {
    // console.log(el);
    return (
      <div className="block" onClick={() => updateGrid(first, second, turn)}>
        {value === 0 ? "" : value}
      </div>
    );
  };

  const updateGrid = (first, second, value) => {
    if (winner !== "") {
      return;
    }
    if (gridValue[first][second] === "X" || gridValue[first][second] === "O") {
      return;
    }
    var newGrid = [...gridValue];
    newGrid[first][second] = value;
    setGridValue(newGrid);
    const result = checkIfMatch(newGrid);
    if (result.match === true) {
      setWinner(result.char);
    }
    turn === "X" ? setTurn("O") : setTurn("X");
  };

  const threePlaceCheck = (item1, item2, item3) => {
    //Check if they are not 0
    if (item1 === 0 || item2 === 0 || item3 === 0) {
      return {
        match: false,
      };
    }
    // Check if they match
    // if yes, return true and also the character
    if (item1 === item2 && item2 === item3) {
      return {
        match: true,
        char: item1,
      };
    }
    // if no, return false
    return {
      match: false,
    };
  };

  const checkIfMatch = (grid) => {
    var isMatched;
    // 00, 01, 02
    isMatched = threePlaceCheck(grid[(0, 0)], grid[(0, 1)], grid[(0, 2)]);
    if (isMatched.match === true) {
      return isMatched;
    }
    //10, 11, 12
    isMatched = threePlaceCheck(grid[1][0], grid[1][1], grid[1][2]);
    if (isMatched.match === true) {
      return isMatched;
    }

    //20, 21, 22
    isMatched = threePlaceCheck(grid[2][0], grid[2][1], grid[2][2]);
    if (isMatched.match === true) {
      return isMatched;
    }

    // 00, 10,20
    isMatched = threePlaceCheck(grid[0][0], grid[1][0], grid[2][0]);
    if (isMatched.match === true) {
      return isMatched;
    }
    // 01, 11, 21
    isMatched = threePlaceCheck(grid[0][1], grid[1][1], grid[2][1]);
    if (isMatched.match === true) {
      return isMatched;
    }

    // 02, 12, 22
    isMatched = threePlaceCheck(grid[0][2], grid[1][2], grid[2][2]);
    if (isMatched.match === true) {
      return isMatched;
    }

    // 20, 11, 02
    isMatched = threePlaceCheck(grid[2][0], grid[1][1], grid[0][2]);
    if (isMatched.match === true) {
      return isMatched;
    }

    // 00, 11, 22
    isMatched = threePlaceCheck(grid[0][0], grid[1][1], grid[2][2]);
    if (isMatched.match === true) {
      return isMatched;
    }

    return false;
  };
  return (
    <div>
      <div className="center">
        <h1>Tic Tac Toe</h1>
        <span style={{ margin: "10px" }}>
          <b>
            {turn}
            's Turn
          </b>
        </span>
        <div className="outer">
          <div style={{ display: "flex" }}>
            {gridValue[0].map((el, index) => {
              return (
                <Square
                  updateGrid={updateGrid}
                  first={0}
                  second={index}
                  value={el}
                />
              );
            })}
          </div>
          <div style={{ display: "flex" }}>
            {gridValue[1].map((el, index) => {
              return (
                <Square
                  updateGrid={updateGrid}
                  first={1}
                  second={index}
                  value={el}
                />
              );
            })}
          </div>
          <div style={{ display: "flex" }}>
            {gridValue[2].map((el, index) => {
              return (
                <Square
                  updateGrid={updateGrid}
                  first={2}
                  second={index}
                  value={el}
                />
              );
            })}
          </div>
        </div>
        <button onClick={reset} style={{ cursor: "pointer", margin: "20px" }}>
          Reset
        </button>
        {winner !== "" && <h1>Winner is: {winner}</h1>}
      </div>
    </div>
  );
}

export default Home;
