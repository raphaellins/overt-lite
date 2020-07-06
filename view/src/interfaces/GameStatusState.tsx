export interface IGameStatusProps {
    history?: Array<String>;
    classes?: any;
    game: IGame;
    handleDelete: Function;
    plusAction?: Function;
}

export interface IGameStatusState {
    email?: String;
    password?: String;
    errors?: Error;
    loading?: boolean;
    retrievedData?: IGame[],
    gameFinished?: IGame[],
    gameQueued?: IGame[]
}

export interface IGame {
    gameNumber?: string,
    numbersPlayed: string[],
    numbersDrawn?: string[],
    numbersState?: IBallState[],
    gameId?: string,
    countMatched?: number,
    ballsMatched?: string[],
    gameDescription?: string,
}

export interface IBallState {
    checked: boolean,
    value: string
}