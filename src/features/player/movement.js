import store from '../../config/store';
import { SPRITE_SIZE } from '../../config/constants';

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

  function dispatchMove(direction) {
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: getNewPosition(direction)
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