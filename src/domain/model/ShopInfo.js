'use strict';

import Smoking from "./Smoking.js"



export default class ShopInfo {
    constructor(commentFromAdmin, openningDate, isNeedToCharge, hasTap, tapCount, smoking) {
        this.commentFromAdmin = commentFromAdmin
        this.openningDate = openningDate
        this.isNeedToCharge = isNeedToCharge
        this.hasTap = hasTap
        this.tapCount = tapCount
        this.smoking = smoking
        //this.latLng
    }

    static parse(json) {
        return new ShopInfo(
            json.comment_from_admin,
            json.openning_date,
            json.is_need_to_charge,
            json.has_tap,
            json.tap_count,
            json.smoking
        )
    }
}