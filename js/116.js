(function () {
    // do it in a worker
    let data = (function () {
        const WEBGL_STR = "WEBGL";
        const UNMASKED_STR = "UNMASKED";
        const VENDOR_STR = "VENDOR";
        const RENDERER_STR = "RENDERER";
        const GET_PARAM = "getParameter";

        const data = new Array(10);
        data[0] = 1;
        data[1] = true;
        data[2] = window.navigator.userAgent;
        data[3] = window.navigator.platform;
        data[4] = window.navigator.deviceMemory || undefined;
        data[5] = window.navigator.hardwareConcurrency || undefined;
        data[6] = window.navigator.language || window.navigator.userLanguage || window.navigator.browserLanguage || window.navigator.systemLanguage;
        data[7] = window.navigator.languages || [];

        const gl = new OffscreenCanvas(256, 256).getContext(WEBGL_STR.toLowerCase());

        if (gl) {
            if (window.navigator.userAgent.indexOf("Firefox") !== -1) {
                const renderer = gl[GET_PARAM](gl[RENDERER_STR]);
                const vendor = gl[GET_PARAM](gl[VENDOR_STR]);
                data[8] = vendor;
                data[9] = renderer;
            } else {
                const debugInfo = gl.getExtension(WEBGL_STR + "_debug_renderer_info");
                if (debugInfo) {
                    data[8] = gl[GET_PARAM](debugInfo[UNMASKED_STR + "_" + VENDOR_STR + "_" + WEBGL_STR]);
                    data[9] = gl[GET_PARAM](debugInfo[UNMASKED_STR + "_" + RENDERER_STR + "_" + WEBGL_STR]);
                }
            }
        }

        return data
    })();

    let lang = window.navigator.language ||
    window.navigator.userLanguage ||
    window.navigator.browserLanguage ||
    window.navigator.systemLanguage

    return [
        function (e, t, r) {
            return !(!e || !r) && t !== r
        }(data[8], data[9], t[et]),

        (
            function (e, t) {
                return !(!e || !t) && JSON.stringify(e) !== JSON.stringify(t)
            }(data[7], window.navigator.languages)),

        (
            function (e, t) {
                return !(!e || !t) && e !== t
            }(data[6], lang)),

        // deviceMemory
        (
            function (e, t) {
                return !(!e || !t) && e !== t
            }(data[4], window.navigator.deviceMemory)),

        // hardwareConcurrency
        (
            function (e, t) {
                return !(!e || !t) && e !== t
            }(data[5], window.navigator.hardwareConcurrency)),

        // platform
        (
            function (e, t) {
                return !(!e || !t) && e !== t
            }(data[3], window.navigator.platform)),

        // userAgent
        (
            function (e, t) {
                return !(!e || !t) && e !== t
            }(data[2], window.navigator.userAgent)),

        function (e) {
            return RegExp('SwiftShader').test(e)
        }(data[9]),

        function (e) {
            return RegExp('Headless').test(e)
        }(data[2])
    ]
})()