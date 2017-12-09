<whats-news>
    <material-progress></material-progress>
    <!-- 最新情報一覧の各ショップのView -->
    <beer-shop-view each={ beerShops } ></beer-shop-view>

    <script>
    import WhatsNew from "../WhatsNew.js";
    import DateUtils from "../util/DateUtils.js"
    import HtmlUtils from "../util/HtmlUtils.js"
    import BeerShopModel from "./BeerShopModel.js"

    const whatsNewViewModel = Symbol()

    this.on('mount', function() {
        var self = this
        this[whatsNewViewModel] = new WhatsNew()
        this[whatsNewViewModel].fetchWhatsNew( (json) => {
            self.beerShops = self.translate(json)
            console.log(self.beerShops)
            self.update()
        })
    })


    // 生のJSON結果をViewModel用のModelに変換
    translate (results) {
        return results.map( (result) => {
            var beerShop = new BeerShopModel()
            beerShop.setName(result.name)
            if(result.message){
                let messageWithNewlineAndSpace = result.message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
                beerShop.setMessage(HtmlUtils.applyAnchorLink(messageWithNewlineAndSpace))
            }
            beerShop.setCreatedAt(DateUtils.toLocaleDateString(result.createdAt))
            beerShop.setFbUrl(result.fbUrl)

            if (result.photos.length > 0) {
                beerShop.setImageUrl(result.photos[0].src)
            }
            return beerShop.toJSON()
        })
    }
    </script>
</whats-news>


<beer-shop-view>
    <div class='beer-shop-view'>
        <section class="card">
        <div class='imageContainer'>
            <img class='scaledImage card-img' src='{ imageUrl }'/>
        </div>
        <div class="card-content">
            <h3 data-name='name'>{ name }</h3>
            <div>
            <div class="grad-wrap">
                <span class="grad-trigger"><span class="fa fa-chevron-down"></span></span>
                <div class="grad-item">
                    <p class='card-text' data-name='message'><raw content='{ message }' /></p>
                </div>
            </div>
            </div>
        </div>
        <div class="card-link">
            <div class='createdAt'>
            <a class='fbUrl' href='{ fbUrl }' target='_blank'>
            <span data-name='createdAt' >{ createdAt }</span>
            </a>
            </div>
        </div>
        </section>
    </div>

    <script>
        import './raw.tag'
        this.on('mount', function() {
            riot.mount('raw');
        })
    </script>
</beer-shop-view>



<material-progress>
<div id='progress'>
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
    <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
</div>
</material-progress>