(() => {
    try {
        (-1).toFixed(-1);
        return 0;
    } catch (err) {
        const arrConstructor = Array;
        const nativeCodeStr = (arrConstructor + '').split(arrConstructor.name).join('');
        return err.message.length + nativeCodeStr.length;
    }
})();