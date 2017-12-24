export default class Map {
    constructor(zip, count, prefecture, address, googleMapUrl, latLng) {
        this.zip = zip
        this.country = count
        this.prefecture = prefecture
        this.address = address
        this.googleMapUrl = googleMapUrl
        this.latLng = latLng
    }

    static parse(json) {
        return new Map(
            json.zip,
            json.country,
            json.prefecture,
            json.address,
            json.google_map_url,
            json.latlng
        )
    }
}