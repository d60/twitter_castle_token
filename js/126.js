await (async function () {
    let hints = [
        "architecture",
        "model",
        "platformVersion",
        "bitness",
        "wow64",
        "uaFullVersion"
    ];


    let uaObj = await navigator.userAgentData.getHighEntropyValues(hints);
    let values = hints.map(k => uaObj[k]);
    return values.every(e => e == '');
})()