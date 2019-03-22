import store from '../../config/store';
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIHGT } from '../../config/constants';

export default function handleMovement(player) {

  function getNewPosition(oldPos, direction) {
    switch(direction) {
      case 'West':
        return [ oldPos[0]-SPRITE_SIZE, oldPos[1] ] 
      case 'East':
        return [ oldPos[0]+SPRITE_SIZE, oldPos[1] ] 
      case 'North':
        return [ oldPos[0], oldPos[1]-SPRITE_SIZE ] 
      case 'South':
        return [ oldPos[0], oldPos[1]+SPRITE_SIZE ] 
    }
  }

  function observeBoundires(oldPos, newPos) {
    return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
           (newPos[1] >= 0 && newPos[1] <= MAP_HEIHGT - SPRITE_SIZE)
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles [y][x];
    return nextTile < 5;
  }

  function dispatchMove(newPos) {
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos
      }
    });
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);

    if(observeBoundires(oldPos, newPos) && observeImpassable(oldPos, newPos)) {
      dispatchMove(newPos)
    }
  }

  function handleKeyDown(e) {
    e.preventDefault()
    switch(e.keyCode) {
      case 37:
        return attemptMove('West')
      case 38: 
        return attemptMove('North')
      case 39: 
        return attemptMove('East')
      case 40: 
        return attemptMove('South')
      default:
        console.log(e.keyCode)
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })
  return player;
}