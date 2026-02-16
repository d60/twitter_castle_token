(function (e, t, r, n) {
    var i = [];
    // 80: chrome
    if (WK[_E]() !== 80 || r) {
        return !1;
    }
    i[0] = t;
    try {
        return t || (i[0] = e.document.createElement('div'),
            i[1] = e.document.body,
            function (e, t) {
                e && e.appendChild(t)
            }(i[1], i[0])),
            !!i[0] && !!e.getComputedStyle && (n ? i[0].setAttribute('class', '_cstl-bg1') : i[0].setAttribute('style', 'background-color: ActiveText'),
                i[2] = e.getComputedStyle(i[0]).backgroundColor,
                i[2] === 'rgb(255, 0, 0)')
    } finally {
        t || (i[3] = e.document.body,
            function (e, t) {
                e && e.removeChild(t)
            }(i[3], i[0]))
    }
})(WK[jN](), window, undefined, undefined)