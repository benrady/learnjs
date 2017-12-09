'use strict';

import CommonView from "./CommonView.js";
// import DateUtils from "./util/DateUtils.js";
// import HtmlUtils from "./util/HtmlUtils.js";


// private instance
const commonView = Symbol();


class WhatsNew {

    constructor() {
        this[commonView] = new CommonView();   
        this.itemHeights = [];
    }

    create(callback) {
        this.fetchWhatsNew((view) => {
            this[commonView].render(view);
            callback()
        });  
    }

    // TOOD: APIから取得している部分をModelに移動したい
    async fetchWhatsNew (callback) {
        const url = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging/whats-new';
        try {
            this[commonView].showProgress()
            const response = await fetch(url);
            // console.log(await response.json());
            const json = await response.json();
            this[commonView].hideProgress();

//            let whatsNewView = this.whatsNewView(json.result);
            console.log(json.result)
            callback(json.result);
            // this.readContinue(whatsNewView)
        } catch(error) {
            this[commonView].hideProgress();
            console.log(error);
        }
    }
}

export default WhatsNew;