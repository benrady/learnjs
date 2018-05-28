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
            games: [{
                id: 1,
                name: 'テストゲーム',
                description: '表示テスト',
                url: 'test!'
            },
            {
                id: 2,
                name: 'テストゲー',
                description: '示テスト',
                url: 'test!'
            }],
            loading: false
        }
    }

    componentDidMount() {
        //const genreId = GameGenreIds.GENRE_ID_ALL;
        //GameListActions.getGameList(genreId);
    }

    render() {
        console.log(this.state);
        const gameDetailComponent = this.state.games.map((value, index) => {
            return (
                <GameDetail game={value} key={"game_" + index} />
            )
        })
        console.log(gameDetailComponent);

        return (
            <div>
                <header>
                    <ul>
                        <li><Link to='/games/1'>All</Link></li>
                        <li><Link to='/games/2'>Novice</Link></li>
                        <li><Link to='/games/3'>Expert</Link></li>
                    </ul>
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