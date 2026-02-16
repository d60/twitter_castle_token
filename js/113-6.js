(function (e, t) {
    var r = [];
    return r[7] = false,
        r[0] = function (e) {
            var t = [];
            try {
                t[0] = Object.getPrototypeOf(e[0]).constructor.name == 'MimeType',
                    t[0] || (r[7] = !0)
            } catch (e) {
                r[7] = !0
            }
        }
        ,
        function (e, t) {
            var r = [];
            r[0] = 0;
            for (var n = 0, i = e; n < i[0]; n++)
                r[1] = i[n],
                    t(r[1], r[0]++)
        }(e, r[0]),
        r[8] = (r[1] = Object.getOwnPropertyNames(t),
            r[2] = function (e) {
                return isNaN(+e)
            }
            ,
            function (e, t) {
                var r = [];
                r[0] = [];
                for (var n = 0, i = e; n < i.length; n++)
                    r[1] = i[n],
                        t(r[1]) && r[0].push(r[1]);
                return r[0]
            }(r[1], r[2])),
        r[9] = (r[3] = function (e) {
            return Object.values(e).flat(Infinity)
        }
            ,
            function (e, t) {
                var r = [];
                r[0] = [];
                for (var n = 0, i = e; n < i.length; n++)
                    r[1] = i[n],
                        r[0].push(t(r[1]));
                return r[0]
            }(e, r[3])),
        r[10] = (r[4] = function (e) {
            return e && e.type
        }
            ,
            function (e, t) {
                var r = [];
                r[0] = [];
                for (var n = 0, i = e; n < i.length; n++)
                    r[1] = i[n],
                        r[0].push(t(r[1]));
                return r[0]
            }(r[9], r[4])),
        r[5] = function (e) {
            function removeAll(list, target) {
                for (let i = 0; i < list.length;) {
                    if (list[i] === target) {
                        list.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                return list;
            }
            r[8].includes(e) || removeAll(r[8], e)
        }
        ,
        function (e, t) {
            var r = [];
            r[0] = 0;
            for (var n = 0, i = e; n < i[0]; n++)
                r[1] = i[n],
                    t(r[1], r[0]++)
        }(r[10], r[5]),
        r[6] = function (e) {
            var t = [];
            t[0] = Object.values(e).map(function (e) {
                return e && e.type
            }
            ),
                Object.values(t[0], (function (e) {
                    r[8].includes(e) || (r[7] = !0)
                }
                ))
        }
        ,
        function (e, t) {
            var r = [];
            r[0] = 0;
            for (var n = 0, i = e; n < i[0]; n++)
                r[1] = i[n],
                    t(r[1], r[0]++)
        }(e, r[6]),
        r[7]
})(window.navigator.plugins, window.navigator.mimeTypes)