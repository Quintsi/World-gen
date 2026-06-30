const MapTiles = {
    forest : {color : "#228B22"},
    plains : {color : "#91BD59"},
    desert : {color : "#EDC9AF"},
    mountain : {color : "#818B99"},
    water : {color : "#D4F1F9"}
};

//determining the size of the map
const MAP_SIZE = 36;
const MAP_COLUMN = Math.round(Math.sqrt(MAP_SIZE)) || 1;
const MAP_ROW = Math.ceil(MAP_SIZE / MAP_COLUMN);
const TILE_MAP = document.getElementById("tile-map");

TILE_MAP.style.gridTemplateColumns = `repeat(${MAP_COLUMN}, 1fr)`;
TILE_MAP.style.gridTemplateRows = `repeat(${MAP_ROW}, 1fr)`;

const tileTypes = Object.keys(MapTiles);

for(let i = 0; i < MAP_SIZE; i++){
    const tile = document.createElement("div");

    const randomType = tileTypes[Math.floor(Math.random() * tileTypes.length)];

    tile.style.backgroundColor = MapTiles[randomType].color;

    TILE_MAP.appendChild(tile);
}