(function () {
    let keyboard = window.navigator.keyboard;
    keyboard.getLayoutMap().then(function (e) {
        keyboard = [];
        e.forEach((function (e, t) {
            keyboard.push(''.concat(e, ',').concat(t))
        }
        ));
        let keyboardString = keyboard.join(' ');
        let keyboardHash = 0;
        for (var n = 0; n < keyboardString.length; n++) {
            let charCode = keyboardString.charCodeAt(n);
            keyboardHash = (keyboardHash << 5) - keyboardHash + charCode;
            keyboardHash |= 0;
        }
        console.log({
            Yv: keyboardHash.toString(),
            Zv: e.size
        })
    }
    )
})()