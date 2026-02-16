(function () {
    // get GPU name
    const errorLength = (() => {
        try {
            (-1).toFixed(-1);
            return 0;
        } catch (err) {
            const arrConstructor = Array;
            const nativeCodeStr = (arrConstructor + '').split(arrConstructor.name).join('');
            return err.message.length + nativeCodeStr.length;
        }
    })();

    let canvas;
    try {
        if (typeof OffscreenCanvas !== 'undefined') {
            canvas = new OffscreenCanvas(256, 256);
        }
    } catch (e) {
    }

    if (!canvas) {
        canvas = document.createElement('canvas');
    }

    if (!canvas.getContext) return undefined;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return undefined;

    if (errorLength === 58) {
        return gl.getParameter(gl.RENDERER);
    } else {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        } else {
            return undefined;
        }
    }
})()