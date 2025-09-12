import { LEVELS } from "../constants/levels";

export function getRandomLevelFn(){
    
    return LEVELS[Math.floor(Math.random() * LEVELS.length)];
}