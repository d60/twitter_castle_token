sdffd = (function () {
    const nav = window.navigator;
    if (!Object.getOwnPropertyNames || !Object.getPrototypeOf || !Object.getOwnPropertyDescriptor) {
        return [];
    }
    let currentObj = nav;
    const allPropertyNames = [];

    do {
        const names = Object.getOwnPropertyNames(currentObj);
        for (let i = 0; i < names.length; i++) {
            allPropertyNames.push(names[i]);
        }
        currentObj = Object.getPrototypeOf(currentObj);
    } while (currentObj);

    const results = [];
    const navPrototype = Object.getPrototypeOf(nav);

    for (let i = 0; i < allPropertyNames.length; i++) {
        const propName = allPropertyNames[i];
        const descriptor = Object.getOwnPropertyDescriptor(navPrototype, propName);
        let stringValue = '';
        if (descriptor) {
            if (descriptor.value !== undefined) {
                stringValue = descriptor.value.toString();
            }
            else if (descriptor.get !== undefined) {
                stringValue = descriptor.get.toString();
            }
        }
        results.push(`${propName}~~~${stringValue}`);
    }
    return results;
})()