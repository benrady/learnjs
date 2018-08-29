'use strict';

/**
 * javascriptにはinterfaceがないため、UseCaseは実装クラスとしている
 */

export default class GetBeerPubUseCase {

    // FIXME: APIかどうかは知ってはダメなので、Repositoryを保持すべき
    constructor(craftBeerLovesApi) {
        this.craftBeerLovesApi = craftBeerLovesApi
    }

    execute(beerPubId, callback) {
        this.craftBeerLovesApi.fetchBeerPub(beerPubId, callback)
    } 
}