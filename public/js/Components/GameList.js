import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Form from 'react-jsonschema-form';

import GameListActions from '../Actions/GameListActions';
import GameGenreIds from '../Actions/GameGenreIds';
import GameDetail from './GameDetail';
import FormSchema from '../Consts/SearchGameFormSchema';
import uiSchema from '../Consts/SearchGameUISchema';

//所持ゲームを一覧化するためのコンテナ
class GameList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games:[]
        }
    }

    componentDidMount() {
        const searchConditions = {
            id: '',
            name: '',
            minPlayNum: '',
            maxPlayNum: ''
        }
        const gamesResult = GameListActions.getGameList(searchConditions);
        console.log(gamesResult);
        /*this.setState({
            games: gamesResult
        })*/
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
                    <div>
                        <Form
                            schema={FormSchema}
                            uiSchema={uiSchema}
                        />
                    </div>
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