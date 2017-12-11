<app-header>
    <header class="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <div class="material-icons mdc-toolbar__menu-icon menu">menu</div>
          <span class="mdc-toolbar__title">Craft Beer Loves</span>
        </section>
      </div>
    </header>


    <navigation-drawer></navigation-drawer>



    <style>
    :scope {
        display: block;
    }
    </style>

    
    <script>

    this.on('mount', function(e) {
        // 初期はelevationなしだが、スクロールしたらelevationがつく
        let toolbar = mdc.toolbar.MDCToolbar.attachTo(document.querySelector('.mdc-toolbar'));
        toolbar.fixedAdjustElement = document.querySelector('.mdc-toolbar-fixed-adjust');
    })
    
    </script>
</app-header>

<navigation-drawer>
<aside class="mdc-temporary-drawer mdc-typography">
    <nav class="mdc-temporary-drawer__drawer">
    <header class="mdc-temporary-drawer__header menu-header">
        <div class="mdc-temporary-drawer__header-content">
        メニュー
        </div>
    </header>
    <nav id="icon-with-text-demo" class="mdc-temporary-drawer__content mdc-list">
        <a class="mdc-list-item mdc-temporary-drawer--selected" href="#">
        <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">home</i>Home
        </a>
        <a class="mdc-list-item" href="#beershops">
        <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">store</i>ビアショップ
        </a>


    </nav>
    </nav>
</aside>

<style>
:scope {
    display: block;
}
.mdc-temporary-drawer__drawer > .menu-header {
    background: #af4805;
}
</style>

<script>
this.on('mount', () =>{
    // メニューをタップしたらドロワーが開く
    let drawer = new mdc.drawer.MDCTemporaryDrawer(document.querySelector('.mdc-temporary-drawer'));
    document.querySelector('.menu').addEventListener('click', () => drawer.open = true);

    // メニューアイテムにクリックイベントを設定する
    document.querySelectorAll('.mdc-list-item').forEach( (element, index, array) => { 
        element.addEventListener('click', () => {
            // 一旦selectedクラスを全削除
            array.forEach((elem => {
                elem.classList.remove('mdc-temporary-drawer--selected')
            }))
            // クリックした要素だけにselectedクラスを当てる
            element.classList.add('mdc-temporary-drawer--selected')
            drawer.open = false
        });
    })

})
</script>
</navigation-drawer>