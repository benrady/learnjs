import AppDispatcher from '../DisPatcher/AppDispatcher';
import GameActionTypes from './GameActionTypes';

const GameLitActions = {
    getGameList(genreId) {
        const gameList = [];
        AppDispatcher.dispatch({
            type: GameActionTypes.GET_LIST,
            payload: gameList
        })
    }
}

export default GameLitActions;