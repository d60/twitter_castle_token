(function (e) {
    let query = `(resolution:${e.devicePixelRatio}dppx)`;
    let bool = (typeof e.matchMedia == 'function') && !e.matchMedia(query).matches;
    if (WK[_E]() !== 77)
        return bool;
})(window)