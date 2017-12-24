class HtmlUtils {
    constructor() {}

    /**
     * String内にあるURLにaタグを付けた文字列を返す。
     * target="_blank"付 // TODO: 引数か何かで切り替えれるといいかも
     * @param {*} str 
     */
    static applyAnchorLink (str) {
        var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
        var regexp_makeLink = function(all, url, h, href) {
            return '<a target="_blank" href="h' + href + '">' + url + '</a>';
        }
        return str.replace(regexp_url, regexp_makeLink);
    }

    static replaceAndApplyAnchorLink(message) {
        let messageWithNewlineAndSpace = message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
        return HtmlUtils.applyAnchorLink(messageWithNewlineAndSpace)
    }

}
export default HtmlUtils;