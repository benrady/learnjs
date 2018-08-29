'use strict';

export default class WhatsNew {

    constructor() {
        this.id = ""
        this.name = ""
        this.message = ""
        this.createdAt = ""
        this.fbUrl = ""
        this.imageUrl = ""
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


    toJSON() {
        let {id, name, message, createdAt, fbUrl, imageUrl} = this
        return {id, name, message, createdAt, fbUrl, imageUrl}
    }


    static parse(json) {
        var model = new WhatsNew()
        model.setId(json.id)
        model.setName(json.name)
        model.setMessage(json.message)
        model.setCreatedAt(json.createdAt)
        model.setFbUrl(json.fbUrl)

        if (json.photos.length > 0) {
            model.setImageUrl(json.photos[0].src)
        }
        return model
    }

    
}