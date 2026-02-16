(function () {
    let x = window.performance.getEntriesByType('navigation')[0]

    return [
        x.redirectEnd - x.redirectStart,
        x.domainLookupEnd - x.domainLookupStart,
        x.connectEnd - x.connectStart,
        x.secureConnectionStart > 0 ? x.connectEnd - x.secureConnectionStart : 0,
        x.responseEnd - x.responseStart,
        x.fetchStart > 0 ? x.responseEnd - x.fetchStart : 0,
        x.requestStart > 0 ? x.responseEnd - x.requestStart : 0,
        x.startTime > 0 ? x.responseEnd - x.startTime : 0,
        x.duration
    ]
})()