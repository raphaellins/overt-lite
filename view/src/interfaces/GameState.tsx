import { IBallState } from "./GameStatusState";

export interface IGameState {
    loading?: boolean;
    ballsNumber?: Array<IBallState>,
    initialGameNumber?: string,
    finalGameNumber?: string,
    errors?: Array<string>,
    retrievedData?: IGame[],
    modalOpened?: boolean,
    gameNumberDuplicate?: string,
    gameToDuplicate?: IGame,
    gameDescription?: string
}

export interface IGame {
    gameNumber?: string,
    numbersPlayed: string[],
    gameId?: string,
    gameDescription?: string
}

export interface IGameProps {
    history?: Array<String>;
    classes?: any;
}