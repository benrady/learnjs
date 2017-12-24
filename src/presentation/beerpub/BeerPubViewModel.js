'use strict';

import BeerPubModel from "../../domain/model/BeerPubModel.js"

export default class BeerPubViewModel {

    constructor(getBeerPubUseCase) {
        this.getBeerPubUseCase = getBeerPubUseCase
    }

    start (beerpubId, callback) {
        this.getBeerPubUseCase.execute(beerpubId,  (result) => {
            console.log(result)
            if (result == null) {return}

            let beerPubModel = BeerPubModel.parse(result)
            callback(beerPubModel)
        })
    }
}
