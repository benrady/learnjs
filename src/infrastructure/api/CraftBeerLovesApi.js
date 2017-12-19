'use strict';

const API_URL = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging'

export default class CraftBeerLovesApi {
    
    constructor() {
        
    }

    async fetchBeerPub (beerPubId, callback) {
        const url = API_URL + '/beerpub/' + beerPubId;
        try {
            const response = await fetch(url);
            // console.log(await response.json());
            const json = await response.json();

            console.log(json.result)
            callback(json.result, null);
        } catch(error) {
            callback(null, error);
            console.log(error);
        }
    }
}