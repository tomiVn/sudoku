
export type EndPoints = 'easy' | 'medium' | 'hard' | 'random';

export interface IGetWithQuery{
    
    endPoints?: EndPoints;
}