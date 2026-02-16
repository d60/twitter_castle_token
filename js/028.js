(function () {
    function detectTouchCapabilities() {
        const nav = window.navigator;
        const doc = window.document;
        let maxPoints = 0;

        if (nav.maxTouchPoints !== undefined && nav.maxTouchPoints !== null) {
            maxPoints = nav.maxTouchPoints;
        } else {
            const msMaxPoints = nav.msMaxTouchPoints;
            if (msMaxPoints !== undefined && msMaxPoints !== null) {
                maxPoints = msMaxPoints;
            }
        }

        let canCreateTouchEvent = false;
        try {
            doc.createEvent('TouchEvent');
            canCreateTouchEvent = true;
        } catch (e) {
            canCreateTouchEvent = false;
        }

        const hasOnTouchStart = 'ontouchstart' in window;
        return {
            Kt: maxPoints,
            Gt: canCreateTouchEvent,
            Xt: hasOnTouchStart
        };
    }

    let data = detectTouchCapabilities();
    let x = parseInt(''.concat(Number(Boolean(data['Gt']))).concat(Number(Boolean(data['Xt']))), 2);

    let int = (data['Kt'] & 63) << 2 | x;
    return (int & 255).toString(16).padStart(2, '0')
})()