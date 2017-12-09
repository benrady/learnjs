'use strict';

import CommonView from "./CommonView.js";
// import DateUtils from "./util/DateUtils.js";
// import HtmlUtils from "./util/HtmlUtils.js";


// private instance


class WhatsNew {

    constructor() {
    }



    // TOOD: APIから取得している部分をModelに移動したい
    async fetchWhatsNew (callback) {
        const url = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging/whats-new';
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

export default WhatsNew;