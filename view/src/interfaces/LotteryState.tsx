import { IBallState } from "./GameStatusState";

export interface ILotteryState {
    email?: String;
    password?: String;
    errors?: Error;
    loading?: boolean;
    retrievedData: IGame[],
    gameFinished: IGame[],
    gameQueued: IGame[],
    gameQueuedScreen: IGame[],
    gameFinishedScreen: IGame[]
}

export interface ILotteryProps {
    history?: Array<String>;
    classes?: any;
    gameFinished?: IGame[],
    gameQueued?: IGame[]
}

export interface IGame {
    gameNumber: string,
    numbersPlayed: string[],
    numbersDrawn: string[],
    numbersState: IBallState[],
    gameId: string,
    countMatched: number,
    ballsMatched: string[]
}