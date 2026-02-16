function isCanvasTampered() {
    let canvas;
    const width = 8;
    const height = 8;

    try {
        if (typeof OffscreenCanvas !== 'undefined') {
            canvas = new OffscreenCanvas(width, height);
        }
    } catch (e) {}

    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return false;

    const writtenPixels = [];
    const readPixels = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const a = 255;

            const colorString = `${r}, ${g}, ${b}, ${a}`;
            ctx.fillStyle = `rgba(${colorString})`;
            ctx.fillRect(x, y, 1, 1);
            writtenPixels.push(colorString);
        }
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const data = ctx.getImageData(x, y, 1, 1).data;
            const colorString = data
                ? `${data[0]}, ${data[1]}, ${data[2]}, ${data[3]}`
                : '';
            readPixels.push(colorString);
        }
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < writtenPixels.length; i++) {
        if (writtenPixels[i] !== readPixels[i]) {
            return true;
        }
    }

    return false;
}

