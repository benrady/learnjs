<!--  各ビアパブの詳細情報を表示します。  -->

<beer-pub>
    <h3>{ name }</h3>
    <div class='beer-pub-detail'>

        <div class='image-list'>
            <ul>
            <li each={value, name  in images}> <img src='{ value }' class='cover' /></li>
            </ul>
        </div>

        <address map={ map }></address>
    </div>

    <script>
    import GetBeerPubUseCase from "../../domain/usecase/GetBeerPubUseCase.js"
    import CraftBeerLovesApi from "../../infrastructure/api/CraftBeerLovesApi.js"
    import BeerPubViewModel from "./BeerPubViewModel.js"

    const beerPubViewModel = Symbol()

    this.on('before-mount', function() {
        // before the tag is mounted
    })

    let self = this
    this.on('mount', function() {
        console.log("opt:", self.opts)
        // TODO: BeerPubViewModelの引数をDIしたい
        this[beerPubViewModel] = new BeerPubViewModel(new GetBeerPubUseCase(new CraftBeerLovesApi()))
        this[beerPubViewModel].start( this.opts.beerpubId, (beerPubModel) => {
            console.log(beerPubModel)
            self.update(beerPubModel)
        })
    })

    this.on('update', function() {
        // allows recalculation of context data before the update
    })

    this.on('updated', function() {
        // right after the tag template is updated after an update call
    })

    this.on('before-unmount', function() {
        // before the tag is removed
        
    })

    this.on('unmount', function() {
        // when the tag is removed from the page
    })

    // curious about all events ?
    this.on('*', function(eventName) {
        console.info(eventName)
    })
    </script>

    <style>
    @charset "UTF-8";

    :scope {
        display: block;
    }

     /*画像リストを横スクロール*/
    ul {
        overflow-x: scroll;
        white-space: nowrap;
        -webkit-padding-start: 0px;
    }
    li {
        display: inline-block;
        padding-right: 5px;
    }
    .cover {
        object-fit: cover;
        width: 200px;
        height: 200px;
        background-color: #ccc;
        border: 1px solid #ccc;
    }

    </style>

</beer-pub>

<address>
    <rg-map map={ map }></rg-map>
    <div class='address'>
        <p>{ zip }</p>
        <p>{ country }</p>
        <p>{ prefecture }</p>
        <p>{ address }</p>
    </div>

    <style>
    :scope {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        height: 200px;
    }
    </style>

    <script>
    let self = this
    this.on('update', () =>{
        self.zip = opts.map.zip
        self.country = opts.map.country
        self.prefecture = opts.map.prefecture
        self.address = opts.map.address
        self.map = {
                center: { lat: 34.668267, lng: 135.499143 },
                zoom: 16
        }
        <!--  self.update()  -->

    })
    this.on('mount', () => {
    })
    </script>
</address>



<rg-map>

    <div class="rg-map"></div>

    <script>
        window.rg = window.rg || {}
        window.rg.gmap = riot.observable({
        initialize: () => {
                window.rg.gmap.trigger('initialize')
            }
        })

        this.on('mount', () => {
            rg.gmap.on('initialize', () => {
                opts.map.mapObj = new google.maps.Map(this.root.querySelector('.rg-map'), opts.map)
                let marker = new google.maps.Marker({
                        position: opts.map.center,
                        map: opts.map.mapObj
                });
                this.trigger('loaded', opts.map.mapObj)
            })

            if (document.getElementById('gmap_script')) {
                remove('gmap_script');
            }
            let script = document.createElement('script')
            script.setAttribute('id', 'gmap_script')
            script.type = 'text/javascript'
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA58OZlZEBjHLPYuS4kxsCcZRgVK0Qn9x0&callback=window.rg.gmap.initialize'
            document.body.appendChild(script)
        })

        function remove(id) {
            var elem = document.getElementById(id);
            return elem.parentNode.removeChild(elem);
        }

    </script>

    <style scoped>
        .rg-map {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
        }

        .rg-map img {
            max-width: inherit;
        }

    </style>

</rg-map>


