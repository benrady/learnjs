'use strict';

import CommonView from "./CommonView.js";
import DateUtils from "./util/DateUtils.js";
import HtmlUtils from "./util/HtmlUtils.js";


// private instance
const commonView = Symbol();


class WhatsNew {

    constructor() {
        this[commonView] = new CommonView();   
        this.itemHeights = [];
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

            let whatsNewView = this.whatsNewView(json.result);
            callback(whatsNewView);
            this.readContinue(whatsNewView)
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

    /**-------------------------
     * 続きをよむセットアップ
    -------------------------*/

    readContinue(beerShopsView)  {
        
        this.hideMessage(beerShopsView);
        this.onClickReadContinueButton(beerShopsView);
    }
    hideMessage(beerShopsView)  {
        var heights = [];
        beerShopsView.find('.beer-shop-view').each(function() {

            var gradWrapView = $(this).find('.grad-wrap');
        
            var originalHeight = gradWrapView.height();
            if(originalHeight < 250){
                // 「続きをよむ」は表示しない
                gradWrapView.find('.grad-trigger').hide();
            } else {
                gradWrapView.find('.grad-item').addClass('is-hide');
            }
            var shortHeight = gradWrapView.height();
            heights.push({original: originalHeight, short:shortHeight});
        });
        this.itemHeights = heights;
    }

    onClickReadContinueButton(beerShopsView) {
        var heights = this.itemHeights;
        beerShopsView.find('.grad-trigger').on('click', function() {
            var index = $(this).index('.grad-trigger');
            var height = heights[index];
            if(!$(this).hasClass('is-show')) {
                $(this).addClass('is-show').next().animate(
                    {height: height.original}, 200
                ).removeClass('is-hide');
                return;
            }
            $(this).removeClass('is-show').next().animate(
                {height:height.short},200
            ).addClass('is-hide');
        })
    }
}

export default WhatsNew;