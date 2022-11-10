import './App.css';
import React, { useRef, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Button, Card, Center } from '@mantine/core';

var ctx;
const GRID_SIZE = 4; // number of dots
const SIZE = 1400; // width and height of game board
const CELL = SIZE / (GRID_SIZE + 2); // size of cells (as well as left and right margin)
const STROKE = CELL / 12; // stroke width
const MARGIN = SIZE - (GRID_SIZE + 1.3) * CELL;

const Game = () => {

  const canvasRef = useRef(null);
  
  const drawDot = (x, y) => {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(x, y, STROKE, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const getX = x => {
    return CELL * (x + 1);
  }
  
  const getY = y => {
    return MARGIN + CELL * y;
  }

  useEffect(() => {
    ctx = canvasRef.current.getContext('2d');
    const createBoard = ctx => {
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          drawDot(getX(j), getY(i));
        }
      }
    }
    createBoard();
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
          <Button size="lg" variant="subtle" onClick="window.location.reload();"> 
              Restart
          </Button>
      </Center>
      <Center>
        <p className='player1'>Player 1</p>
        <p className='player2'>Player 2</p>
        <p className='player3'>Player 3</p>
      </Center>
      <Center>
        <div className='card'>
          <Card withBorder shadow="sm" radius="md">
            <canvas width="1000" height="1000" className='canvas' ref={canvasRef}
            />
          </Card>
        </div>
      </Center>
    </div>
  );
}

export default Game;