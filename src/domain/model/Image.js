

export default class Image {
    constructor(url, comment) {
        this.url = url
        this.comment = comment
    }

    static parseArray(images) {
        return images.map ((image) => {
            return Image.parse(image)
        })
    }

    static parse(json) {
        return new Image(
            json.url,
            json.comment
        )
    }
}