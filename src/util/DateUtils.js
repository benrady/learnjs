class DateUtils {
    constructor() {}

    // ChromeとSafariでDateの扱いが異なる
    // https://stackoverflow.com/a/42151174

    static parseDate(date) {
        let parsed = Date.parse(date);
        if (!isNaN(parsed)) {
        return parsed;
        }
        return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
    }

    static toLocaleDateString(date) {
        let ms = DateUtils.parseDate(date);
        return (new Date(ms)).toLocaleString();
    }
}
export default DateUtils;