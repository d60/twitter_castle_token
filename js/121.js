(function () {
    let props = [
        [
            "Navigator.appVersion",
            "Navigator.deviceMemory",
            "Navigator.doNotTrack",
            "Navigator.hardwareConcurrency",
            "Navigator.language",
            "Navigator.languages",
            "Navigator.oscpu",
            "Navigator.platform",
            "Navigator.userAgent",
            "Navigator.vendor",
            "Navigator.plugins",
            "Navigator.mimeTypes",
            "Navigator.maxTouchPoints"
        ],
        [
            "Screen.width",
            "Screen.height",
            "Screen.availWidth",
            "Screen.availHeight",
            "Screen.colorDepth",
            "Screen.pixelDepth"
        ],
        [
            "Date.getTimezoneOffset",
            "Intl.RelativeTimeFormat.resolvedOptions",
            "Intl.DateTimeFormat.resolvedOptions"
        ],
        [
            "FontFace.load",
            "FontFace.family",
            "FontFace.status",
            "String.fromCodePoint",
            "CSSStyleDeclaration.setProperty",
            "CSS2Properties.setProperty"
        ],
        [
            "HTMLCanvasElement.toDataURL",
            "HTMLCanvasElement.getContext",
            "WebGLRenderingContext.getParameter",
            "WebGL2RenderingContext.getParameter",
            "WebGLRenderingContext.getExtension",
            "WebGL2RenderingContext.getExtension",
            "WebGLRenderingContext.getSupportedExtensions",
            "WebGL2RenderingContext.getSupportedExtensions"
        ],
        [
            "CanvasRenderingContext2D.fillText",
            "CanvasRenderingContext2D.font",
            "CanvasRenderingContext2D.getImageData",
            "CanvasRenderingContext2D.strokeText",
            "TextMetrics.actualBoundingBoxAscent",
            "TextMetrics.actualBoundingBoxDescent",
            "TextMetrics.actualBoundingBoxLeft",
            "TextMetrics.actualBoundingBoxRight",
            "TextMetrics.fontBoundingBoxAscent",
            "TextMetrics.fontBoundingBoxDescent",
            "TextMetrics.width",
            "HTMLCanvasElement.toDataURL",
            "HTMLCanvasElement.getContext",
            "String.fromCodePoint"
        ],
        [
            "TextMetrics.actualBoundingBoxAscent",
            "TextMetrics.actualBoundingBoxDescent",
            "TextMetrics.actualBoundingBoxLeft",
            "TextMetrics.actualBoundingBoxRight",
            "TextMetrics.fontBoundingBoxAscent",
            "TextMetrics.fontBoundingBoxDescent",
            "TextMetrics.width"
        ],
        [
            "AudioBuffer.getChannelData",
            "AudioBuffer.copyFromChannel"
        ]
    ]

    function countKeys(arr) {
        return arr.filter(function (key) {
            return WK[EO][key];
        }).length;
    }

    return props.map(countKeys);
})()