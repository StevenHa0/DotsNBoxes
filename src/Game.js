// TODO FUNCTIONS (Assignment not completed in time):
// 1. Connect the Konva Lines to the Konva Circles (the dots)
// 2. When a "Square" is created, set the color of the player
//    to the player that completed the square
// 3. Update the score of the player who completed a square
// 4. Create a function that detects if all dots have been connected
// 5. Create a popup window to announce the winner with the highest score
////////////////////////
/**
 * Since I did not complete the project in time, I instead created a counter
 * for each player to manually increase the score.
 * I also added a button to end the game, which displays the player with
 * the highest score.
 *
 * I hope my work is still considered, I have put in many hours into this assignment.
 */

import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Center, Modal } from "@mantine/core";
import Konva from "konva";

const GRID_SIZE = 4; // number of dots
const SIZE = 380; // width and height of game board
const CELL = SIZE / (GRID_SIZE + 1); // size of cells (as well as left and right margin)
const MARGIN = SIZE - GRID_SIZE * CELL;

// game vars
var currentTurn = 1;
var sides = {};
var lineCoords = {};
var square1filled = false;
var square2filled = false;
var square3filled = false;
var square4filled = false;
var square5filled = false;
var square6filled = false;
var square7filled = false;
var square8filled = false;
var square9filled = false;
var squaresfilled = 0;

// colors
const COLOR_P1 = "red";
const COLOR_P2 = "blue";
const COLOR_P3 = "green";

const Game = () => {
  // State to store count value
  const [player1Count, setPlayer1Count] = useState(0);
  const [player2Count, setPlayer2Count] = useState(0);
  const [player3Count, setPlayer3Count] = useState(0);

  // State to open and close pop-up windows
  const [endGameOpened, setEndGameOpened] = useState(false);
  const [firstPlace, setFirstPlace] = useState(0);
  const [firstPlacePlayer, setFirstPlacePlayer] = useState("");

  function incrementPlayerCount() {
    switch (currentTurn) {
      case 1:
        setPlayer1Count((player1Count) => player1Count + 1);
        break;
      case 2:
        setPlayer2Count((player2Count) => player2Count + 1);
        break;
      case 3:
        setPlayer3Count((player3Count) => player3Count + 1);
        break;
      default:
        break;
    }
  }

  function drawDot(x, y, layer) {
    const dot = new Konva.Circle({
      x: x,
      y: y,
      fill: "black",
      radius: 6,
    });
    layer.add(dot);
  }

  function drawEmptyLine(x1, y1, x2, y2, layer, id) {
    lineCoords[id] = { x1, y1, x2, y2, id };
    sides[id] = false;
    const line = new Konva.Line({
      stroke: "black",
      opacity: 0.2,
      strokeWidth: 5,
      lineCap: "round",
      lineJoin: "round",
      points: [x1, y1, x2, y2],
      id: id.toString(),
    });
    layer.add(line);
  }

  function getNearestLineId(mousePosX, mousePosY) {
    let nearest = 1000;
    let minLineId = 1000;
    for (let i = 0; i < Object.keys(lineCoords).length; i++) {
      if (lineCoords[i].y1 === lineCoords[i].y2) {
        if (
          Math.abs(mousePosY - lineCoords[i].y1) < nearest &&
          mousePosX > lineCoords[i].x1 &&
          mousePosX < lineCoords[i].x1 + 76
        ) {
          nearest = Math.abs(mousePosY - lineCoords[i].y1);
          minLineId = lineCoords[i].id;
        }
      } else if (lineCoords[i].x1 === lineCoords[i].x2) {
        if (
          Math.abs(mousePosX - lineCoords[i].x1) < nearest &&
          mousePosY > lineCoords[i].y1 &&
          mousePosY < lineCoords[i].y1 + 76
        ) {
          nearest = Math.abs(mousePosX - lineCoords[i].x1);
          minLineId = lineCoords[i].id;
        }
      }
    }
    return minLineId;
  }

  function addLine(id) {
    sides[id] = true;
    if (squareComplete()) {
      // TODO: fill complete square with player color
    } else {
      currentTurn++;
      if (currentTurn > 3) currentTurn = 1;
    }
  }

  function squareComplete() {
    const prev_squaresfilled = squaresfilled;
    if (!square1filled && sides[0] && sides[1] && sides[6] && sides[7]) {
      square1filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square2filled && sides[2] && sides[7] && sides[8] && sides[13]) {
      square2filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square3filled && sides[4] && sides[13] && sides[10] && sides[19]) {
      square3filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square4filled && sides[6] && sides[3] && sides[9] && sides[12]) {
      square4filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square5filled && sides[8] && sides[9] && sides[14] && sides[15]) {
      square5filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square6filled && sides[10] && sides[15] && sides[16] && sides[21]) {
      square6filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square7filled && sides[12] && sides[5] && sides[18] && sides[11]) {
      square7filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square8filled && sides[14] && sides[11] && sides[20] && sides[17]) {
      square8filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    if (!square9filled && sides[16] && sides[17] && sides[22] && sides[23]) {
      square9filled = true;
      squaresfilled++;
      incrementPlayerCount();
    }
    // if the amount of squares filled before is less than now, return true
    if (prev_squaresfilled < squaresfilled) return true;
    else return false;
  }

  function getX(x) {
    return CELL * x + 46;
  }

  function getY(y) {
    return MARGIN + CELL * y - 38;
  }

  function drawStage() {
    var stage = new Konva.Stage({
      height: 300,
      width: 319,
      container: "konva-holder",
    });
    const layer = new Konva.Layer();
    stage.add(layer);
    // Draw empty lines for the user to click on
    var id = 0;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        // horizontal line
        drawEmptyLine(getX(j), getY(i), getX(j + 1), getY(i), layer, id, stage);
        id++;
        // vertical line
        drawEmptyLine(getX(i), getY(j), getX(i), getY(j + 1), layer, id, stage);
        id++;
      }
    }
    stage.on("click", function () {
      let mousePos = stage.getPointerPosition();
      let lineId = getNearestLineId(mousePos.x, mousePos.y);
      if (!sides[lineId]) {
        let line = stage.findOne("#" + lineId);
        new Konva.Tween({
          node: line,
          stroke: getColor(),
          opacity: 1,
        }).play();
        addLine(lineId);
      }
    });
    // Draw the corresponding 4 x 4 dots
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        drawDot(getX(j), getY(i), layer);
      }
    }
    return stage;
  }

  function getColor() {
    if (currentTurn === 1) {
      return COLOR_P1;
    } else if (currentTurn === 2) {
      return COLOR_P2;
    } else if (currentTurn === 3) {
      return COLOR_P3;
    }
  }

  function findFirstPlace(player1Count, player2Count, player3Count) {
    var rank = [player1Count, player2Count, player3Count].sort().reverse();
    setFirstPlace(rank[0]);
    return rank[0];
  }

  function findFirstPlacePlayer(
    player1Count,
    player2Count,
    player3Count,
    firstPlace
  ) {
    if (
      firstPlace === player1Count &&
      firstPlace > player2Count &&
      firstPlace > player3Count
    )
      setFirstPlacePlayer("Player 1 wins with " + firstPlace + " points!");
    else if (
      firstPlace === player2Count &&
      firstPlace > player1Count &&
      firstPlace > player3Count
    )
      setFirstPlacePlayer("Player 2 wins with " + firstPlace + " points!");
    else if (
      firstPlace === player3Count &&
      firstPlace > player1Count &&
      firstPlace > player2Count
    )
      setFirstPlacePlayer("Player 3 wins with " + firstPlace + " points!");
    else if (
      firstPlace === player1Count &&
      firstPlace === player2Count &&
      firstPlace > player3Count
    )
      setFirstPlacePlayer(
        "Player 1 and 2 tied with " + firstPlace + " points!"
      );
    else if (
      firstPlace === player1Count &&
      firstPlace === player3Count &&
      firstPlace > player2Count
    )
      setFirstPlacePlayer(
        "Player 1 and 3 tied with " + firstPlace + " points!"
      );
    else if (
      firstPlace === player2Count &&
      firstPlace === player3Count &&
      firstPlace > player1Count
    )
      setFirstPlacePlayer(
        "Player 2 and 3 tied with " + firstPlace + " points!"
      );
    else if (
      firstPlace === player2Count &&
      firstPlace === player3Count &&
      firstPlace === player1Count
    )
      setFirstPlacePlayer("All players tied with " + firstPlace + " points!");
  }

  // Draws the stage on start
  useEffect(() => {
    drawStage();
  }, []);

  // Triggered when game is over (ie. total count is 9)
  useEffect(() => {
    if (player1Count + player2Count + player3Count === 9) {
      let firstPlace = findFirstPlace(player1Count, player2Count, player3Count);
      findFirstPlacePlayer(
        player1Count,
        player2Count,
        player3Count,
        firstPlace
      );
      setEndGameOpened(true);
    }
  }, [player1Count, player2Count, player3Count]);

  return (
    <div>
      <Center>
        <p className="game-title">Dots N Boxes</p>
      </Center>
      <Center>
        <p id="count">{player1Count}</p>
        <p id="count">{player2Count}</p>
        <p id="count">{player3Count}</p>
      </Center>
      <Modal
        className="modal"
        opened={endGameOpened}
        onClose={() => {
          setEndGameOpened(false);
          document.location.reload();
        }}
      >
        <h1>Results:</h1>
        <p>{firstPlacePlayer}</p>
      </Modal>
      <Center>
        <p variant="outline" color="dark" id="player1">
          Player 1
        </p>
        <p variant="outline" color="dark" id="player2">
          Player 2
        </p>
        <p variant="outline" color="dark" id="player3">
          Player 3
        </p>
      </Center>
      <Center>
        <div className="card">
          <Card withBorder shadow="sm" radius="md">
            <div id="konva-holder"></div>
          </Card>
        </div>
      </Center>
      <Center>
        <Button
          className="leave-game"
          size="lg"
          variant="subtle"
          component={Link}
          to="/"
        >
          Leave Game
        </Button>
      </Center>
    </div>
  );
};

export default Game;
