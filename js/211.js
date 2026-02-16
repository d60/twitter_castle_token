(function () {
    return function () {
        let canvas = window.document.createElement('canvas');
        let context = canvas.getContext('2d');
        canvas.width = 80;
        canvas.height = 60;
        let texts = ['𑀓𑀷', 'မြန်မာစာ', 'བོད་ཡིག'];
        context.font = '170px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(texts[0], 0, 30);
        context.fillText(texts[1], 40, 30);
        context.fillText(texts[2], 60, 30);
        return canvas.toDataURL().length;
    }()
})()
