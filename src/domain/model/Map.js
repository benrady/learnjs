export default class Map {
    constructor(zip, count, prefecture, address) {
        this.zip = zip
        this.country = count
        this.prefecture = prefecture
        this.address = address
        this.googleMapUrl = ""
        //this.latLng
    }

    static parse(json) {
        return new Map(
            json.zip,
            json.country,
            json.prefecture,
            json.address
        )
    }
}