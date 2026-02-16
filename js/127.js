await(async function () {
    let hints = [
        "architecture",
        "model",
        "platformVersion",
        "bitness",
        "wow64",
        "uaFullVersion"
    ];
    let uaObj = await navigator.userAgentData.getHighEntropyValues(hints);
    return [uaObj['bitness'] === '64', uaObj['bitness'] === '32', uaObj['wow64'], uaObj['mobile']]
})()