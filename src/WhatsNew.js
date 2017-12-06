'use strict';

import CommonView from "./CommonView.js";
import DateUtils from "./util/DateUtils.js";
import HtmlUtils from "./util/HtmlUtils.js";


// private instance
const commonView = Symbol();

class WhatsNew {

    constructor() {
        this[commonView] = new CommonView();     
    }

    async fetchWhatsNew (callback) {
        const url = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging/whats-new';
        try {
            
            this[commonView].showProgress()
            const response = await fetch(url);
            // console.log(await response.json());
            const json = await response.json();
            this[commonView].hideProgress();

            let whatsNewView = this.whatsNewView(json.result);
            callback(whatsNewView);
        } catch(error) {
            this[commonView].hideProgress();
            console.log(error);
        }
    }

    whatsNewView(whatsNews) {
        let beerShopsView = this[commonView].template('beer-shops-view');
    
        $.each(whatsNews, (i, whatsNew) => {
            let shopView = this[commonView].template('beer-shop-view');
            if(whatsNew.message){
                let messageWithNewlineAndSpace = whatsNew.message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
                whatsNew.message = HtmlUtils.applyAnchorLink(messageWithNewlineAndSpace);
            }

            whatsNew.createdAt = DateUtils.toLocaleDateString(whatsNew.createdAt)
            console.log(whatsNew);
            shopView.find('a').filter('.fbUrl').attr('href', whatsNew.fbUrl);

            if (whatsNew.photos.length > 0) {
                shopView.find('.scaledImage').attr('src', whatsNew.photos[0].src);
            }
            this[commonView].applyObject(whatsNew, shopView);
            beerShopsView.append(shopView);
        });
        return beerShopsView
    }
}

export default WhatsNew;