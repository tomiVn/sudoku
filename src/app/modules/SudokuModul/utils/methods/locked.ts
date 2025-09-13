export function getLockedFn(inputArr: number[][]){

    return inputArr.map(row => row.map(cell => cell !== 0));
}