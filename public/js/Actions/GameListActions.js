//import AppDispatcher from '../DisPatcher/AppDispatcher';
import GameActionTypes from './GameActionTypes';
import APIPath from '../Consts/APIPath';
import axios from 'axios';

const GameLitActions = {
    async getGameList(searchConditions) {
        const pathToAPI = APIPath.SEARCH;

        let response = {
            games: []
        }

        try{
            console.log(pathToAPI + '?id=' + searchConditions.id + '?name=' + searchConditions.name + '?minPlayNum=' + searchConditions.minPlayNum + '?maxPlayNum=' + searchConditions.maxPlayNum);
            response = await axios.get(pathToAPI + '?id=' + searchConditions.id + '?name=' + searchConditions.name + '?minPlayNum=' + searchConditions.minPlayNum + '?maxPlayNum=' + searchConditions.maxPlayNum);
            console.log(response);
        }
        catch(e){
            console.log('failed');
        }

        return response;
    }
}

export default GameLitActions;