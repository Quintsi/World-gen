import { perlin } from './perlin.js';

const MapTiles = {
    forest : {color : "#228B22"},
    plains : {color : "#91BD59"},
    desert : {color : "#EDC9AF"},
    mountain : {color : "#818B99"},
    water : {color : "#D4F1F9"}
};

//determining the size of the map
const MAP_COLUMN = 40;
const MAP_ROW = 40;
const MAP_SIZE = MAP_COLUMN * MAP_ROW;
const TILE_MAP = document.getElementById("tile-map");

TILE_MAP.style.gridTemplateColumns = `repeat(${MAP_COLUMN}, 1fr)`;
TILE_MAP.style.gridTemplateRows = `repeat(${MAP_ROW}, 1fr)`;

const FREQUENCY = 0.1;

for(let i = 0; i < MAP_SIZE; i++){
    const tile = document.createElement("div");

    const x = i % MAP_COLUMN;
    const y = Math.floor(i / MAP_COLUMN);

    const noiseValue = perlin.noise(x * FREQUENCY, y * FREQUENCY);

    let biome;
    if(noiseValue < 0.3){
        biome = MapTiles.water;
    } else if(noiseValue < 0.45) {
        biome = MapTiles.desert;
    } else if(noiseValue < 0.65) {
        biome = MapTiles.plains;
    } else if(noiseValue < 0.85) {
        biome = MapTiles.forest;
    } else {
        biome = MapTiles.mountain;
    }

    tile.style.backgroundColor = biome.color;
    TILE_MAP.appendChild(tile);
}