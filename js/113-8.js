(function (e) {
    var t = [];
    try {
        return t[0] = e.document.createElement('iframe'),
            t[0].srcdoc = e.crypto.randomUUID().replace(/-/g, ''),
            !!t[0].contentWindow
    } catch (e) {
        return !0
    }
})(window)