(function (win, callback) {
    let hasFrameFired = false;
    const perf = window.performance;
    const Prom = window.Promise;
    const isPromiseAvailable = typeof Prom !== 'undefined';

    if (isPromiseAvailable && perf) {
        const measurementPromise = new Prom(function (resolve) {
            const startTime = perf.now();
            requestAnimationFrame(function () {
                if (!hasFrameFired) {
                    hasFrameFired = true;
                    const frameLatency = perf.now() - startTime;
                    resolve(frameLatency);
                }
            });
        });

        measurementPromise
            .then(function (result) {
                callback(result | 0);
            })
            .catch(function () {
                callback(undefined);
            });
    } else {
        callback(undefined);
    }
})(window, console.log);