export default class Smoking {
    constructor(isSmoking, info) {
        this.isSmoking = isSmoking
        this.info = info
    }

    static parse(json) {
        return new Smoking(
            json.is_smoking,
            json.info
        )
    }
}