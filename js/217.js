(function analyzeScreenProperties() {
    const doc = window.document;
    const screen = window.screen;
    const screenWidth = screen.width || 0;
    const screenHeight = screen.height || 0;

    const checkMediaMatch = (feature, value) => {
        if (!('getComputedStyle' in window)) return null;

        const div = doc.createElement('div');
        const style = doc.createElement('style');
        const cssRule = `@media (device-${feature}: ${value}px) { body { --device-${feature}: ${value}; } }`;

        try {
            style.textContent = cssRule;
            div.appendChild(style);
            doc.body.appendChild(div);

            const computedStyle = window.getComputedStyle(doc.body);
            const computedValue = computedStyle.getPropertyValue(`--device-${feature}`).trim();

            return computedValue ? parseInt(computedValue, 10) : null;
        } catch (e) {
            return null;
        } finally {
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
        }
    };

    let measuredDpi = 0;
    for (let f = 56; f < 2000; f++) {
        if (window.matchMedia && window.matchMedia(`(max-resolution: ${f}dpi)`).matches) {
            measuredDpi = f;
            break;
        }
    }

    // isScreenExtended
    // isAvailSizeLarger
    // isDocSizeLarger
    // isInnerSizeLarger
    // isOuterSizeLarger
    // isCssDeviceSizeConsistent
    // isDpiInconsistent
    // isFullscreen

    return [
        !!screen.isExtended,
        (screen.availWidth || 0) > screenWidth || (screen.availHeight || 0) > screenHeight,
        doc.documentElement.clientWidth > screenWidth || doc.documentElement.clientHeight > screenHeight,
        (window.innerWidth || 0) > screenWidth || (window.innerHeight || 0) > screenHeight,
        (window.outerWidth || 0) > screenWidth,
        (
            checkMediaMatch('width', screenWidth) === screenWidth &&
            checkMediaMatch('height', screenHeight) === screenHeight
        ),
        measuredDpi !== window.devicePixelRatio * 96,
        doc.fullscreenElement !== null
    ];
})()