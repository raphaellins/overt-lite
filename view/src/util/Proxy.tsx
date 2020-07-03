
import axios from 'axios';
import { User } from '../interfaces/User';

const urlBase = () => {
    return "https://us-central1-overtlite.cloudfunctions.net/api";
}

export const login = async (userData: User, onError: Function) => {
    return await axios
        .post(`${urlBase}/login`, userData)
        .catch((error) => onError(error) );
}

export const listAllGamesMatched = () => {
    return axios.get(`${urlBase}/games`);
}

export const newDraw = async (drawData: any) => {
    return await axios
        .post(`${urlBase}/new-draw`, drawData)
}

export const deleteDraw = async (drawId: string) => {
    return await axios.delete(`${urlBase}/draw/${drawId}`)
}

export const listAllDraws = async () => {
    return await axios.get(`${urlBase}/draws-all`)
}

export const newGame = async (gameData: any) => {
    return await axios
        .post(`${urlBase}/new-game`, gameData);
}

export const deleteGame = async (gameId: string) => {
    return await axios.delete(`${urlBase}/game/${gameId}`);
}

export const listAllGames = async () => {
    return await axios.get(`${urlBase}/games-all`);
}