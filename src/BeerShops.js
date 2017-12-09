'use strict';

import CommonView from "./CommonView.js";

// private instance
const commonView = Symbol();

class BeerShops {
    constructor() {
        this[commonView] = new CommonView();
    }

    start() {
        let beerShopsView = this[commonView].template('beer-shops-view');
        this[commonView].render(beerShopsView);


    }
}
export default BeerShops;