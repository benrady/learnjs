'use strict';

import Map from "./Map.js"

export default class BeerPubModel {

    constructor() {
        this.id = ""
        this.name = ""
        this.message = ""
        this.createdAt = ""
        this.fbUrl = ""
        this.imageUrl = ""
        this.map = new Map()
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

    setMap(value) {
        this.map = value
    }

    setImages(values) {
        this.images = values
    }

    toJSON() {
        let {id, name, message, createdAt, fbUrl, imageUrl, map, images} = this
        return {id, name, message, createdAt, fbUrl, imageUrl, map, images}
    }


    static parse(json) {
        var model = new BeerPubModel()
        model.setId(json.id)
        model.setName(json.name)
        model.setMap(Map.parse(json.map))
        model.setImages(json.images)
        return model
    }
}