import React from 'react';

function getTileSprite(type) {}

function MapTile(props) {
  return <div className="tile">{props.tile}</div>
}

function MapRow(props) {
  return <div className="row"> { props.tiles.map( tile => <MapTile tile={tile}/>) } </div> 
}

const Map = props => {
  return(
    <div
      style={{
        width: '800px',
        height: '400px',
        border: '4px solid white',
      }} 
    >
      {
        props.tiles.map( row => <MapRow tiles={row} /> )
      }
    </div>
  );
}

export default Map;