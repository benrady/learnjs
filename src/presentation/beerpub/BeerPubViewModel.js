'use strict';


export default class BeerPubViewModel {

    constructor(getBeerPubUseCase) {
        this.getBeerPubUseCase = getBeerPubUseCase
    }

    start (beerpubId, callback) {
        this.getBeerPubUseCase.execute(beerpubId, callback)
    }
}
