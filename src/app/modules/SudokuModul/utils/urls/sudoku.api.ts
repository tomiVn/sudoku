export const SUDOKU_API = 'https://sugoku.onrender.com/';

//EndPoints Get with Query: easy/medium/hard/random
export const SUDOKU_API_GET_WITH_QUERY = (endPoint: string) =>  SUDOKU_API + 'board?difficulty=' + endPoint;

export const SUDOKU_API_SOLVE    = SUDOKU_API + 'solve';

export const SUDOKU_API_VALIDATE = SUDOKU_API + 'validate';

export const SUDOKU_API_GRADE    = SUDOKU_API + 'grade';