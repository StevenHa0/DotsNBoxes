import './App.css'
import dots from './dots.png'
import { Link } from "react-router-dom";
import { Button, Center } from '@mantine/core';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={dots} className="App-logo" alt="logo" />
        <p className='title'>
          Dots N Boxes
        </p>
        <Center>
          <Button size="lg" variant="subtle" component={Link} to="/game">
              Start Game
          </Button>
        </Center>
      </header>
    </div>
  );
}

export default App;
