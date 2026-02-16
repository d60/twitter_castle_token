(function (e) {
    let pdr = e.devicePixelRatio;
    // 58: firefox
    if (!(WK[_E]() === 58 && pdr != 1)) {
        let query = `(device-width:${e.screen.width}px) and (device-height:${e.screen.height}px)`;
        return (typeof e.matchMedia == 'function') && !e.matchMedia(query).matches
    }
})(window)