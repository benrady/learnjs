'use strict';

import BeerPubModel from "../../domain/model/BeerPubModel.js"
import HtmlUtils from "../util/HtmlUtils.js"

export default class BeerPubViewModel {

    constructor(getBeerPubUseCase) {
        this.getBeerPubUseCase = getBeerPubUseCase
    }

    start (beerpubId, callback) {
        this.getBeerPubUseCase.execute(beerpubId,  (result) => {
            console.log(result)
            if (result == null) {return}

            let model = BeerPubModel.parse(result)
            model.shopInfo.commentFromAdmin = (model.shopInfo.commentFromAdmin ? HtmlUtils.replaceAndApplyAnchorLink(model.shopInfo.commentFromAdmin) : "")
            callback(model)
        })
    }
}
