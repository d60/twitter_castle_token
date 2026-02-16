(function () {
    function getContext(canvas, width, height, op) {
        let ctx = canvas.getContext('2d', op);
        canvas.width = width;
        canvas.height = height;
        return ctx;
    }

    function render(e, t, r, n, i, o) {
        !function (e, t, r, n) {
            e.fillText(t, r, n)
        }(e, t, r, n);
        let result = !function (e, t, r, n, i) {
            if (e)
                try {
                    return e.getImageData(t, r, n, i).data;
                } catch (e) {
                    return
                }
        }(e, i, o, 1, 1);
        return [result[0], result[1], result[2], result[3]]
    }

    var t = [];
    if (function (e) {
        var t = [];
        return t[0] = window.performance,
            !(!t[0] || !(typeof t[0].now == 'function'))
    }(window) && (t[0] = window.HTMLCanvasElement,
        !function (e) {
            return typeof e == typeof undefined
        }(t[0]))) {
        let performance = window.performance;
        !function (e, t) {
            var r = window.document.createElement('canvas');
            var n = getContext(r, 96, 96, {
                willReadFrequently: true
            });
            if (n) {
                n.font = '94px '.concat('sans-serif'),
                    n.fillStyle = '#000';
                for (var i = 0; t > i; i++)
                    render(n, '🗺️', -1, 96, Math.floor(80 * Math.random()), Math.floor(80 * Math.random()))
            }
        }(window, 3);
        let time1 = performance.now();
        !function (e, t) {
            var r = window.document.createElement('canvas');
            var n = getContext(r, 96, 96, {
                willReadFrequently: true
            });
            if (n) {
                n.font = '94px '.concat('sans-serif'),
                    n.fillStyle = '#000';
                for (var i = 0; t > i; i++)
                    render(n, '🗺️', -1, 96, Math.floor(80 * Math.random()), Math.floor(80 * Math.random()))
            }
        }(window, 7);
        let diff1 = performance.now() - time1;
        let time2 = performance.now();
        !function (e, t) {
            var r = window.document.createElement('canvas');
            var n = getContext(r, 96, 96, {
                willReadFrequently: false
            });
            if (n) {
                n.font = '94px '.concat('sans-serif'),
                    n.fillStyle = '#000';
                for (var i = 0; t > i; i++)
                    render(n, '🗺️', -1, 96, Math.floor(80 * Math.random()), Math.floor(80 * Math.random()))
            }
        }(window, 7);
        let diff2 = performance.now() - time2;
        let diff_rate = diff2 !== 0 && diff1 !== 0 ? diff2 / diff1 : 0;
        var r = diff_rate;
        return Math.round(r * 1000) / 1000;
    }
})()