
import axios from 'axios';
import { User } from '../interfaces/User';

const urlBase = () => {
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };

    return "https://us-central1-overtlite.cloudfunctions.net/api";
}

export const loginSystem = async (userData: User, onError: Function) => {
    return await axios
        .post(`${urlBase()}/login`, userData)
        .catch((error) => onError(error) );
}

export const listAllGamesMatched = async () => {
    return await axios.get(`${urlBase()}/games`);
}

export const newDraw = async (drawData: any) => {
    return await axios
        .post(`${urlBase()}/new-draw`, drawData)
}

export const deleteDraw = async (drawId: string |  undefined) => {
    return await axios.delete(`${urlBase()}/draw/${drawId}`)
}

export const listAllDraws = async () => {
    return await axios.get(`${urlBase()}/draws-all`)
}

export const newGame = async (gameData: any) => {
    return await axios
        .post(`${urlBase()}/new-game`, gameData);
}

export const deleteGame = async (gameId: string | undefined) => {
    return await axios.delete(`${urlBase()}/game/${gameId}`);
}

export const listAllGames = async () => {
    return await axios.get(`${urlBase()}/games-all`);
}

export const GetUser = async ( onError: Function) => {
    return await axios.get(`${urlBase()}/user`)
    .catch(error =>  onError(error));
}