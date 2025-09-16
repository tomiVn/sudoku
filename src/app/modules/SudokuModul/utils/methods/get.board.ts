export function getBoardWithValueFn(value: number){

    return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => value));
}