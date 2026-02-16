(function () {

    var t = [];

    let data = {
        di: !1,
        hi: !1,
        pi: !1,
        mi: !1,
        yi: null
    };

    try {
        t[1] = HTMLCanvasElement
            .prototype
            .toDataURL
            .toString();

        data['di'] = !function (e, t) {
            return e.indexOf(t) > -1;
        }.call(void 0, t[1], 'native code');

    } catch (e) { }

    try {
        t[2] = CanvasRenderingContext2D
            .prototype
            .getImageData
            .toString();

        data['hi'] = !function (e, t) {
            return e.indexOf(t) > -1;
        }.call(void 0, t[2], 'native code');

    } catch (e) { }

    try {
        CanvasRenderingContext2D
            .prototype
            .getImageData
            .apply(void 0, [0, 0, 1, 1]);

    } catch (e) {
        data['yi'] = e.message;
    }

    // is not chrome
    // if (YL[sT]() !== 80) {
    //     return data;
    // }

    try {
        data['pi'] = !0;

        Object.setPrototypeOf(
            HTMLCanvasElement.prototype.toDataURL,
            HTMLCanvasElement.prototype.toDataURL
        );

    } catch (e) {
        (function (e, t) {
            return e.indexOf(t) > -1;
        }).call(void 0, e.message, 'Cyclic') &&
            (data['pi'] = !1);
    }

    try {
        data['mi'] = !0;

        Object.setPrototypeOf(
            CanvasRenderingContext2D.prototype.getImageData,
            CanvasRenderingContext2D.prototype.getImageData
        );

    } catch (e) {

        (function (e, t) {
            return e.indexOf(t) > -1;
        }).call(void 0, e.message, 'Cyclic') &&
            (data['mi'] = !1);
    }

    return [[
        data.mi,
        data.pi,
        data.hi,
        data.di
    ], data.yi]
})();