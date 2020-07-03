
import axios from 'axios';
import { User } from '../interfaces/User';

class Proxy {

    urlBase = () => {
        return process.env.URL_API;
    }

    login = async (userData: User, onError: Function) => {
        return await axios
            .post(`${this.urlBase()}/login`, userData)
            .catch((error) => { () => onError(error) });
    }

    listAllGamesMatched = async () => {
        return await axios.get(`${this.urlBase()}/games`);
    }

    newDraw = async (drawData: any) => {
        return await axios
            .post(`${this.urlBase()}/new-draw`, drawData)
    }

    deleteDraw = async (drawId: string) => {
        return await axios.delete(`${this.urlBase()}/draw/${drawId}`)
    }

    listAllDraws = async () => {
        return await axios.get(`${this.urlBase()}/draws-all`)
    }

    newGame = async (gameData: any) => {
        return await axios
            .post(`${this.urlBase()}/new-game`, gameData);
    }

    deleteGame = async (gameId: string) => {
        return await axios.delete(`${this.urlBase()}/game/${gameId}`);
    }

    listAllGames = async () => {
        return await axios.get(`${this.urlBase()}/games-all`);
    }
}