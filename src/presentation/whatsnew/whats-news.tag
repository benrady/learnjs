<whats-news>
    <material-progress></material-progress>
    <!-- 最新情報一覧の各ショップのView -->
    <div class='whats-new-beer-pubs'>
        <beer-pub-view each={ beerPubs } ></beer-pub-view>
    </div>


    <script>
    import CommonView from "../common/CommonView.js";
    import DateUtils from "../util/DateUtils.js"
    import HtmlUtils from "../util/HtmlUtils.js"
    import WhatsNew from "../../domain/model/WhatsNew.js"

    import WhatsNewViewModel from "./WhatsNewViewModel.js";

    import '../common/material-progress.tag'

    const commonView = Symbol();
    const whatsNewViewModel = Symbol()


    let self = this

    this.on('mount', function() {
        riot.mount('material-progress')

        this[commonView] = new CommonView();   
        this[whatsNewViewModel] = new WhatsNewViewModel()

        this[commonView].showProgress()
        this[whatsNewViewModel].fetchWhatsNew( (result, error) => {
            if(error == null) {
                self.beerPubs = self.translate(result)
                self.update()
                this[commonView].hideProgress();
                return
            }
            console.log(error)
            this[commonView].hideProgress();
            alert('ごめんなさい、なんか処理に失敗したみたいです。。。時間かかるかもですが、修正しますのでまた来てくださいね。')
        })
    })

    this.on('updated', function() {
        // 一旦メッセージなどをセットしてなみないとDOMの高さがわからないため、
        // ココで続きを読むボタンをセットしている
        self.readContinue()
    })

    // 生のJSON結果をViewModel用のModelに変換
    translate (results) {
        return results.map( (result) => {
            let model = WhatsNew.parse(result)
            model.setMessage(model.message ? HtmlUtils.replaceAndApplyAnchorLink(model.message) : "")
            model.setCreatedAt(DateUtils.toLocaleDateString(model.createdAt))
            return model.toJSON()
        })
    }


    /**-------------------------
     * 続きをよむセットアップ
    -------------------------*/

    readContinue()  {
        this.hideMessage();
    }

    /**
     * メッセージが長すぎたら隠して、続きを読むボタンを配置する
     * @param {*} beerPubsView 
     */
    hideMessage()  {
        let self = this
        $('.whats-new-beer-pubs').find('.beer-pub-view').find('.grad-wrap').each((_, view) => {
            let originalHeight = $(view).height();
            if(originalHeight < 250){
                // 「続きをよむ」は表示しない
                $(view).find('.grad-trigger').hide();
                $(view).find('div').removeClass('grad-item').addClass('default-item');
            } else {
                $(view).find('.grad-item').addClass('is-hide');
            }
            let shortHeight = $(view).height();
            self.onClickReadContinueButton($(view), originalHeight, shortHeight)
        });
    }

    /**
     * 続きを読むボタンのクリックイベント処理
     * @param {*} beerPubsView 
     */
    onClickReadContinueButton(view, originalHeight, shortHeight) {
        view.find('.grad-trigger').on('click', function() {
            let index = $(this).index('.grad-trigger');
            if(!$(this).hasClass('is-show')) {
                $(this).addClass('is-show').next().animate(
                    {height: originalHeight}, 200
                ).removeClass('is-hide');
                return;
            }
            $(this).removeClass('is-show').next().animate(
                {height:shortHeight},200
            ).addClass('is-hide');
        })
    }

    this.on('*', function(eventName) {
        console.info(eventName)
    })

    </script>

    <style>
    @charset "UTF-8";

    :scope {
        display: block;
        --read-more-background-color: #d85a0a;
        --read-more-text-color: #fff;
    }
    /** 続きを読む */
    .grad-wrap {
        position: relative;
        & + .grad-wrap {
            margin-top: 40px;
        }
    }
    .grad-trigger {
        z-index: 2;
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        /* width: 148px; */
        margin: auto;
        padding: .5em 0;
        border-radius: 2px;
        background: var(--read-more-background-color);
        color: var(--read-more-text-color);
        /* font-size: 1.3rem; */
        text-align: center;
        cursor: pointer;
        transition: .2s ease;
        box-shadow: 0 0 3px rgba(0,0,0,.3);

        &::after {
            content: "続きを読む"
        }
        &:hover {
            background: var(--read-more-text-color);
            color: var(--read-more-background-color);
        }
        & .fa {
            margin-right: .5em;
        }
        &.is-show {
            bottom: -2em;
        }
        &.is-show::after {
            content: "閉じる"
        }
        &.is-show .fa {
            transform: rotate(180deg);
        }
        &.is-show + .grad-item::before {
            display: none;
        }
    }

    .grad-item {
        position: relative;
        overflow: hidden;

        &.is-hide {
            height: 160px;
        } 
        & p + p {
            margin-top: 1em;
        }
        &::before {
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            padding-top: 4em;
            content: "";
            width: 100%;
            height: 40px; /*グラデーションで隠す高さ*/
            background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.9) 50%, #fff 100%);
            background: linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.9) 50%, #fff 100%);
        }
    }

    .default-item {
        position: relative;
        overflow: hidden;
    }
    </style>
</whats-news>


<beer-pub-view>
    <div class='beer-pub-view'>
        <section class="card">
        <div class='image-content'>
        <a href="#beerpubs/{ id }" class="link-area"></a>
        <div class='imageContainer'>
            <img class='scaledImage card-img' src='{ imageUrl }'/>
        </div>
        <div class="card-content">
            <h3 data-name='name'>{ name }</h3>
            <div>
            <div class="grad-wrap">
                <span class="grad-trigger"><span class="fa fa-chevron-down"></span></span>
                <div class="grad-item">
                    <p class='card-text' data-name='message'><raw content='{ message || "" }' /></p>
                </div>
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
    <style>
    :scope {
        display: block;
    }
    .image-content{
        position:relative;
    }
    a.link-area {
        text-decoration: none;
        color: inherit;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    </style>
    <script>
        import '../common/raw.tag'
        this.on('mount', function() {
            riot.mount('raw');
        })
    </script>
</beer-pub-view>



