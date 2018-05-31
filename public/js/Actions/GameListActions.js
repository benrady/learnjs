//import AppDispatcher from '../DisPatcher/AppDispatcher';
import GameActionTypes from './GameActionTypes';
import axios from 'axios';

const GameLitActions = {
    async getGameList(genreId) {
        const pathToAPI = 'https://path-to-api.jp';
        const response = await axios.get(pathToAPI + '/games?genreId=' + genreId);
        if(response.status === 200){
            return response.games;
        }
        else{
            return;
        }
    }
}

export default GameLitActions;