


class CommonView {
    constructor() {
        // no-op
    }

    // bind data
    applyObject(obj, elem) {
        for (var key in obj) {
            elem.find('[data-name="' + key + '"]').html(obj[key]);
        }
    }

    // templateからコピー
    template(name) {
        return $('.templates .' + name).clone();
    }
    
    showProgress() {
        this.hideSideBar();
        $('#progress').show();
    }
    
    hideProgress() {
        $('#progress').hide();
        this.showSideBar();
    }
    
    showSideBar() {
        $('#sidebar-container').show();
    }
    hideSideBar() {
        $('#sidebar-container').hide();
    }

    triggerEvent(name, args) {
        $('.view-container>*').trigger(name, args);
    }

    render(view) {
        this.triggerEvent('removingView',[]);
        $('.view-container').empty().append(view);
    }

    
}
export default CommonView;
