

export default class Sns {
    constructor(facebook, instagram, twitter) {
        this.facebook = facebook
        this.instagram = instagram
        this.twitter = twitter
    }

    static parse(json) {
        return new Sns(
            json.facebook,
            json.instagram,
            json.twitter
        )
    }
}