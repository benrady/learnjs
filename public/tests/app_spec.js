import React from 'react';
import { mount, render, configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import axios from 'axios';
import AppDispatcher  from '../js/DisPatcher/AppDispatcher';

import { MemoryRouter } from 'react-router-dom';
import LandingRouter from '../js/LandingRouter';
import LandingPage from '../js/Components/landing';
import GameList from '../js/Components/GameList';
import GameDetail from '../js/Components/GameDetail';
import GameListActions from '../js/Actions/GameListActions';
import GameActionTypes from '../js/Actions/GameActionTypes';
import APIPath from '../js/Consts/APIPath';

describe('Routing', () => {
    //トップページ
    it('can show the root landing page', () => {
        //MemoryRouterがうまく動いてない。。。
        //const wrapper = render(<MemoryRouter initialEntries={['']}><LandingRouter /></MemoryRouter>)
        const wrapper = shallow(<LandingPage />);
        expect(wrapper.find('h3').text()).toBe('Howdy!! Good Gamers');
    });
});

describe('GameList', () => {
    //保有ゲーム一覧を取得するメソッドがコールされる
    it('can show the game-list page', async () => {
        const wrapper = shallow(<GameList />);
        spyOn(GameListActions, 'getGameList');
        await wrapper.instance().componentDidMount();
        expect(GameListActions.getGameList).toHaveBeenCalled();
    });

    //GameDetailはゲーム内容をテーブル上に表示する
    it('can show the game\'s detail as table', () => {
        const game = {
            id: 1,
            name: 'テストゲーム',
            description: '表示テスト',
            url: 'test!'
        }
        const wrapper = shallow(<GameDetail game={game} />);
        expect(wrapper.find('td').first().text()).toBe('テストゲーム');
    });
});

describe('Get All Games', ()=>{
    //ゲームリストを取得する
    const pathToApi = APIPath.SEARCH;
    it('can call get-games api with its conditions given by argument', ()=>{
        spyOn(axios, 'get');
        const searchCondition = {
            id: '',
            name: 'test',
            minPlayNum: 1,
            maxPlayNum: 2
        }
        GameListActions.getGameList(searchCondition);
        expect(axios.get).toHaveBeenCalledWith(pathToApi + '?id=' + searchCondition.id + '?name=' + searchCondition.name + '?minPlayNum=' + searchCondition.minPlayNum + '?maxPlayNum=' + searchCondition.maxPlayNum);
    });
});