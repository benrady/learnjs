import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import GameListActions from '../Actions/GameListActions';
import GameGenreIds from '../Actions/GameGenreIds';
import GameDetail from './GameDetail';

//所持ゲームを一覧化するためのコンテナ
class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games:[]
        }
    }

    componentDidMount() {
        const genreId = GameGenreIds.GENRE_ID_ALL;
        const gamesResult = GameListActions.getGameList(genreId);
        this.setState({
            games: gamesResult
        })
    }

    render() {
        const gameDetailComponent = this.state.games.map((value, index) => {
            return (
                <GameDetail game={value} key={"game_" + index} />
            )
        })

        return (
            <div>
                <header>
                    
                </header>
                <table className='u-full-width'>
                    <tbody>
                        {gameDetailComponent}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GameList;