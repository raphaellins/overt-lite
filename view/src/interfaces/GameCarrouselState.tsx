import { IGame } from "./LotteryState";


export interface IGameCarrouselState {
    count: number;
    page: number;
    rowsPerPage: number;
    gamesScreen: IGame[];
}

export interface IGameCarrouselProps {
    games: IGame[];
    classes?: any;
    handleDelete: Function;
}