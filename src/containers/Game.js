import React from 'react';

const movement = {
  direction: {
    keys: ['w', 'a', 's', 'd'],
    index: {
      w: 'north',
      a: 'west',
      s: 'south',
      d: 'east'
    }
  }
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {
        isMoving: false,
        direction: 'south',
        location: {
          x: 0,
          y: 0,
          z: 0
        }
      },
      map: {
        extremites: {
          north: 100,
          west: -100,
          south: -100,
          east: 100
        }
      }
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp   = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(event) {
    if (movement.direction.keys.includes(event.key)) {
      let newState = this.state;
      newState.player.isMoving = true;
      newState.player.direction = movement.direction.index[event.key];
      if (event.key === 'w' && newState.player.location.y < newState.map.extremites.north) newState.player.location.y += 1;
      if (event.key === 'a' && newState.player.location.x > newState.map.extremites.west ) newState.player.location.x -= 1;
      if (event.key === 's' && newState.player.location.y > newState.map.extremites.south) newState.player.location.y -= 1;
      if (event.key === 'd' && newState.player.location.x < newState.map.extremites.east ) newState.player.location.x += 1;
      this.setState(newState);
    };
  }
  
  handleKeyUp(event) {
    if (movement.direction.keys.includes(event.key)) {
      let newState = this.state;
      newState.player.isMoving = false;
      this.setState(newState);
    };
  }

  render() {
    const { player } = this.state;
    const movingPlayerNorth     = <p>moving north</p>;
    const movingPlayerWest      = <p>moving west</p>;
    const movingPlayerSouth     = <p>moving south</p>;
    const movingPlayerEast      = <p>moving east</p>;
    const stationaryPlayerNorth = <img alt="standing-north" src="/images/jedi_standing_north.png"/>;
    const stationaryPlayerWest  = <p>standing west</p>;
    const stationaryPlayerSouth = <img alt="standing-south" src="/images/jedi_standing_south.gif"/>;
    const stationaryPlayerEast  = <p>standing east</p>;
    let playerElement;
    if (player.isMoving) {
      if (player.direction === 'north') playerElement = movingPlayerNorth;
      if (player.direction === 'west' ) playerElement = movingPlayerWest;
      if (player.direction === 'south') playerElement = movingPlayerSouth;
      if (player.direction === 'east' ) playerElement = movingPlayerEast;
    } else {
      if (player.direction === 'north') playerElement = stationaryPlayerNorth;
      if (player.direction === 'west' ) playerElement = stationaryPlayerWest;
      if (player.direction === 'south') playerElement = stationaryPlayerSouth;
      if (player.direction === 'east' ) playerElement = stationaryPlayerEast;
    };
    return (
      <div id="game">
        Game
        {playerElement}
        <p>{`(${player.location.x}, ${player.location.y})`}</p>
      </div>
    );
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

}

export default Game;