await(async function () {
    let uaData = await navigator.userAgentData.getHighEntropyValues([]);
    function getCleanBrowserBrand(uaData) {
        if (!uaData || !uaData.brands) return undefined;
        let brands = uaData.brands.map(item => item.brand);

        brands = brands.filter(brand => !/Not/.test(brand));
        if (brands.length > 1) {
            brands = brands.filter(brand => !/Chromium/.test(brand));
        }
        if (brands.length > 0) {
            return brands.join(',');
        }
    }
    return getCleanBrowserBrand(uaData);
})()