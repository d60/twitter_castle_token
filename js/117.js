(function () {

    // [false, false, false, false, true, true, true, false, false, true, false, false, false, true, false]

    function detectEnvironment() {
        const hasVideoPlaybackQuality = 'getVideoPlaybackQuality' in HTMLVideoElement.prototype;
        const supportsModernAppearance = typeof window.CSS?.supports === 'function' && window.CSS.supports('appearance: initial');
        const hasContentIndex = 'ContentIndex' in window;
        const hasContactsManager = 'ContactsManager' in window;
        const hasDownlinkMax =
            !!window.NetworkInformation &&
            'downlinkMax' in (window.NetworkInformation.prototype || {});
        return {
            ni: supportsModernAppearance && !hasContentIndex,
            ai: hasVideoPlaybackQuality && !hasContactsManager,
            ti: !hasDownlinkMax
        };
    }
    let chromeData = WK[_E]() == 80 ? detectEnvironment() : {}


    function checkCSS(e) {
        return e.CSS && (typeof e.CSS.supports == 'function') && e.CSS.supports('border-end-end-radius: initial')
    }

    function checkBrowserIntegration() {
        return true;
    }

    function checkCSS2(e, t) {
        var r = [];
        return e.CSS && (r[se] = e.CSS.supports,
            function (e) {
                return typeof e === 'function'
            }(r[se])) && e.CSS.supports(t)
    }


    return [
        typeof window.matchMedia === 'function' && Boolean(window.matchMedia('(dynamic-range: high)').matches),

        !WK[J] && !WK[hp][WK[cp]] && (r[de] = function () {
            return WK[rU](e)
        }
            ,
            function (e) {
                try {
                    return e()
                } catch (e) {
                    WK[rx](e)
                }
            }(r[de])),  //false

        Object.keys(window).slice(-50).includes('chrome') && Object.getOwnPropertyNames(window).slice(-50).includes('chrome'),

        (function checkChromeRuntime() {
            if (!window.chrome?.runtime) return false;

            try {
                new window.chrome.runtime.sendMessage();
                new window.chrome.runtime.connect();

                return true;
            } catch (err) {
                return err.constructor.name !== 'TypeError';
            }
        })(),

        chromeData['ni'],

        chromeData['ai'],

        chromeData['ti'],

        function () {
            let ptn = RegExp('Headless');
            return ptn.test(window.navigator.userAgent) || ptn.test(window.navigator.appVersion)
        }(),

        'Notification' in window && window.Notification.permission === 'denied',

        typeof window.matchMedia === 'function' && Boolean(window.matchMedia('(prefers-color-scheme: light)').matches),

        'pdfViewerEnabled' in window.navigator && !window.navigator.pdfViewerEnabled,

        // is full screen
        window.innerWidth === window.screen.width && window.outerHeight === window.screen.height || window.visualViewport && ~~window.visualViewport.width === window.screen.width && ~~window.visualViewport.height === window.screen.height,

        checkBrowserIntegration() && checkCSS2(window, 'accent-color: initial') && (!('share' in window.navigator) || !('canShare' in window.navigator)),

        checkCSS(window),

        window.navigator.webdriver == undefined
    ]
})()


