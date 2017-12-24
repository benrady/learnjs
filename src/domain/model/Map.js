export default class Map {
    constructor(zip, count, prefecture, address, latLng) {
        this.zip = zip
        this.country = count
        this.prefecture = prefecture
        this.address = address
        this.googleMapUrl = ""
        this.latLng = latLng
    }

    static parse(json) {
        return new Map(
            json.zip,
            json.country,
            json.prefecture,
            json.address,
            json.latlng
        )
    }
}