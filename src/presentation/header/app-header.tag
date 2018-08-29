<app-header>
    <header class="mdc-toolbar mdc-toolbar--fixed mdc-toolbar--waterfall" id="app-bar">
      <div class="mdc-toolbar__row">
        <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
          <div class="material-icons mdc-toolbar__menu-icon menu">menu</div>
          <span class="mdc-toolbar__title">Craft Beer Loves</span>
        </section>
      </div>
    </header>

    <main class="craft-main" id="craft-main">
    <navigation-drawer></navigation-drawer>
    </main>



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
<aside id="craft-drawer" class="mdc-drawer mdc-drawer--modal mdc-typography craft-drawer">
    <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title">メニュー</h3>
    </div>
    <div class="mdc-drawer__content">
        <nav class="mdc-list">
            <a class="mdc-list-item mdc-list-item--activated" href="#" tabindex="0">
            <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">home</i>
            Home
            </a>
            <a class="mdc-list-item" href="#">
            <i class="material-icons mdc-list-item__start-detail" aria-hidden="true">store</i>
            ビアパブ
            </a>
        </nav>
    </div>
</aside>
<div class="mdc-drawer-scrim"></div>
    


<style>
:scope {
    display: block;
     <!--  TODO: アプリ全体として共通化したい  -->
    --craft-main-color: #af4805;
}

</style>

<script>
this.on('mount', () =>{
    // サンプル
    // https://github.com/material-components/material-components-web/blob/master/demos/drawer/modal-drawer.html  
    // 変更点
    // https://github.com/material-components/material-components-web/commit/3aa211d53f7cec023225dcabcb818e87b7c19a79#diff-614caabe799112e00d0713c15b8cd131
    // TODO：Navigation Drawerが開かない・・・(018/08/29)
    var drawerEl = document.getElementById('craft-drawer');
    var drawer = new mdc.drawer.MDCDrawer(drawerEl);
    var topAppBarEl = document.getElementById('app-bar');
    var topAppBar = new mdc.topAppBar.MDCTopAppBar(topAppBarEl);
    var mainEl = document.querySelector('.craft-main');
    topAppBar.setScrollTarget(mainEl);
    topAppBar.listen('MDCTopAppBar:nav', function() {
        drawer.open = !drawer.open;
    });
    const listEl = drawerEl.querySelector('.mdc-list');
    //var selectedDestinationEl = document.querySelector('.demo-selected-destination');
    var mainEl = document.querySelector('.craft-main');
//    listEl.addEventListener('click', function(event) {
        //drawer.open = false;
        //selectedDestinationEl.textContent = event.target.lastChild.textContent;
    //});

})
</script>
</navigation-drawer>