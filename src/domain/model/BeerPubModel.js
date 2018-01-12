'use strict';

import ShopInfo from "./ShopInfo.js"
import Map from "./Map.js"
import Sns from "./Sns.js"
import Image from "./Image.js"

export default class BeerPubModel {

    constructor() {
        this.id = ""
        this.name = ""
        this.message = ""
        this.createdAt = ""
        this.fbUrl = ""
        this.imageUrl = ""
        this.shopInfo = new ShopInfo()
        this.map = new Map()
        this.sns = new Sns()
        this.images = []

    
    }
    setId(value) {
        this.id = value
    }

    getId() {
        return this.id
    }

    setName(value) {
        this.name = value
    }

    getName() {
        return this.name
    }

    setMessage(value) {
        this.message = value
    }

    getMessage() {
        return this.message
    }

    setCreatedAt(value) {
        this.createdAt = value
    }

    getCreatedAt() {
        return this.createdAt
    }
    
    setFbUrl(value) {
        this.fbUrl = value
    }

    getFbUrl() {
        return this.fbUrl
    }

    setImageUrl(value) {
        this.imageUrl = value
    }

    getImageUrl() {
        return this.imageUrl
    }

    setShopInfo(value) {
        this.shopInfo = value
    }
    setMap(value) {
        this.map = value
    }
    setSns(value) {
        this.sns = value
    }

    setImages(values) {
        this.images = values
    }

    toJSON() {
        let {id, name, message, createdAt, fbUrl, imageUrl, map, images, sns} = this
        return {id, name, message, createdAt, fbUrl, imageUrl, map, images, sns}
    }


    static parse(json) {
        var model = new BeerPubModel()
        model.setId(json.id)
        model.setName(json.name)
        model.setShopInfo(ShopInfo.parse(json.shop_info))
        model.setMap(Map.parse(json.map))
        model.setSns(Sns.parse(json.sns))
        model.setImages(Image.parseArray(json.images))
        return model
    }
}