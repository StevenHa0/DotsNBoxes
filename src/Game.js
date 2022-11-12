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

import './App.css';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Button, Card, Center, Modal } from '@mantine/core';
import Konva from 'konva';

const GRID_SIZE = 4; // number of dots
const SIZE = 380; // width and height of game board
const CELL = SIZE / (GRID_SIZE + 1); // size of cells (as well as left and right margin)
const MARGIN = SIZE - (GRID_SIZE) * CELL;

// game vars
var currentTurn = 1;
var stage, drawLayer;
var color;
var firstPlace;
var firstPlacePlayer;

// colors
const COLOR_P1 = 'red';
const COLOR_P2 = 'blue';
const COLOR_P3 = 'green';

const Game = () => {

  // State to store count value
  const [player1Count, setCount1] = useState(0);
  const [player2Count, setCount2] = useState(0);
  const [player3Count, setCount3] = useState(0);

  // State to open and close pop-up windows
  const [endGameOpened, setEndGameOpened] = useState(false);
  const [rulesOpened, setRulesOpened] = useState(false);

  // Functions to increment player count by 1
  function incrementPlayer1Count() { setCount1(player1Count + 1) };
  function incrementPlayer2Count () { setCount2(player2Count + 1) };
  function incrementPlayer3Count() { setCount3(player3Count + 1) };

  function drawDot(x, y, layer) {
    const dot = new Konva.Circle({
      x: x,
      y: y,
      fill: 'black',
      radius: 6,
    });
    layer.add(dot);
  }

  function getX(x) {
    return CELL * x + 46;
  }

  function getY(y) {
    return MARGIN + CELL * y - 38;
  }

  function drawStage() {
    var stage = new Konva.Stage ({
      height: 300,
      width: 319,
      container: "konva-holder",
    });
    stage.getRelativePointerPosition();
    const layer = new Konva.Layer();
    stage.add(layer);
    // Draw the corresponding 4 x 4 dots
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        drawDot(getX(j), getY(i), layer)
      }
    }
    return stage
  }

  function drawLine() {
    var isDrawing = false;
    var lastLine;
    stage.on('mousedown touchstart', function (e) {
      color = getColor();
      isDrawing = true;
      var pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
        stroke: color,
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
        points: [pos.x, pos.y, pos.x, pos.y],
      });
      drawLayer.add(lastLine);
    });

    stage.on('mouseup touchend', function () {
      isDrawing = false;
    });

    // drawing
    stage.on('mousemove touchmove', function (e) {
      if (!isDrawing) {
        return;
      }

      const pos = stage.getPointerPosition();
      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
    });
  }

  function addDrawLayer(stage) {
    drawLayer = new Konva.Layer();
    stage.add(drawLayer);
  }

  function getColor() {
    if (currentTurn === 1) {
      currentTurn = 2;
      return COLOR_P1;
    }
    else if (currentTurn === 2) {
      currentTurn = 3;
      return COLOR_P2;
    }
    else if (currentTurn === 3) {
      currentTurn = 1;
      return COLOR_P3;
    }
  }

  function rulesButton() {
    // implement restart button to refresh page
    let restart = document.getElementById("restart");
    restart.addEventListener('click', () => {
      
    });
  }

  function restartButton() {
    // implement restart button to refresh page
    let restart = document.getElementById("restart");
    restart.addEventListener('click', () => {
      document.location.reload();
    });
  }

  function endGameButton() {
    // implement end game button to display results
    let endgame = document.getElementById("end-game");
    endgame.addEventListener('click', () => {
      
    });
  }

  function player1Button() {
    // set button 1 to player 1 drawing
    let btnplayer1 = document.getElementById("player1");
    btnplayer1.addEventListener('click', () => {
      currentTurn = 1;
    });
  }

  function player2Button() {
    // set button 2 to player 2 drawing
    let btnplayer2 = document.getElementById("player2");
    btnplayer2.addEventListener('click', () => {
      currentTurn = 2;
    });
  }

  function player3Button() {
    // set button 3 to player 3 drawing
    let btnplayer3 = document.getElementById("player3");
    btnplayer3.addEventListener('click', () => {
      currentTurn = 3;
    });
  }

  function endGame() {
    var rank = [player1Count, player2Count, player3Count].sort().reverse();
    firstPlace = rank[0];

    if (firstPlace === player1Count)
      firstPlacePlayer = 'Player 1';
    else if (firstPlace === player2Count)
      firstPlacePlayer = 'Player 2';
    else if (firstPlace === player3Count)
      firstPlacePlayer = 'Player 3';
  }

  useEffect(() => {
    stage = drawStage();
    addDrawLayer(stage);
    drawLine();
    restartButton();
    endGameButton();
    player1Button();
    player2Button();
    player3Button();
  }, [])

  return (
    <div className="Game">
      <Center>
        <p className='game-title'>
          Dots N Boxes
        </p>
      </Center>
      <Center>
          <Button size="lg" variant="subtle" component={Link} to="/">
              Back to Landing Page
          </Button>
          <Button onClick={() => setRulesOpened(true) } id="rules" size="lg" variant="subtle" > 
              Rules
          </Button>
          <Button id="restart" size="lg" variant="subtle" > 
              Restart
          </Button>
          <Button onClick={() => { setEndGameOpened(true); endGame(); }} id="end-game" size="lg" variant="subtle" > 
              End Game
          </Button>
      </Center>
      <Center>
        <p id='count'>{player1Count}</p>
        <p id='count'>{player2Count}</p>
        <p id='count'>{player3Count}</p>
      </Center>
      <Modal opened={endGameOpened} onClose={() => {
          setEndGameOpened(false);
          document.location.reload();
        }}
      >
          <h1>Results:</h1>
          <p>Winner: {firstPlacePlayer} with a score of {firstPlace}</p>
      </Modal>
      <Modal opened={rulesOpened} onClose={() => {
          setRulesOpened(false);
        }}
      >
          <h3>Rules:</h3>
          <ol>
            <li>
              Click on the player who would like to start the game. 
              If a player is not selected, Player 1 is automatically chosen.</li>
            <br/>
            <li>
              Manually draw a line from one dot to another. Lines must only
              be drawn vertically or horizontally to the nearest dot.
            </li>
            <br/>
            <li>
              If a player completes a square, click on the player to increase their
              score. That player is able to draw again.
            </li>
            <br/>
            <li>
              To see the results, click on the "End Game" button to see the winner!
            </li>
          </ol>
      </Modal>
      <Center>
        <Button onClick={incrementPlayer1Count} variant="outline" color="dark" id='player1'>Player 1</Button>
        <Button onClick={incrementPlayer2Count} variant="outline" color="dark" id='player2'>Player 2</Button>
        <Button onClick={incrementPlayer3Count} variant="outline" color="dark" id='player3'>Player 3</Button>
      </Center>
      <Center>
        <div className='card'>
          <Card withBorder shadow="sm" radius="md">
            <div id="konva-holder"></div>
          </Card>
        </div>
      </Center>
    </div>
  );
}

export default Game;