(function () {
    let timeOrigin = window.performance.timeOrigin;

    let v1 = timeOrigin + window.performance.now();
    let v2 = Math.round(v1);

    return Math.ceil(Math.abs(v2 - Date.now()) / 1000)

})()