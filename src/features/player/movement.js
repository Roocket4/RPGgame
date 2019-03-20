import store from '../../config/store';
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIHGT } from '../../config/constants';

export default function handleMovement(player) {

  function getNewPosition(direction) {
    const oldPos = store.getState().player.position;
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
           ? newPos : oldPos
  }

  function dispatchMove(direction) {
    const oldPos = store.getState().player.position;
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: observeBoundires(oldPos, getNewPosition(direction))
      }
    });

  }

  function handleKeyDown(e) {
    e.preventDefault()
    switch(e.keyCode) {
      case 37:
        return dispatchMove('West')
      case 38: 
        return dispatchMove('North')
      case 39: 
        return dispatchMove('East')
      case 40: 
        return dispatchMove('South')
      default:
        console.log(e.keyCode)
    }
  }

  window.addEventListener('keydown', (e) => {
    handleKeyDown(e)
  })
  return player;
}