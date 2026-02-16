(function () {
    let flag = false;
    if (WK[_E]() !== 80) {
        return false;
    }
    let iframe = window.document.createElement('iframe')
    iframe.setAttribute('class', '_cstl-bx2');
    iframe.setAttribute('sandbox', 'allow-scripts');
    window.document.body.appendChild(iframe)
    try {
        iframe.contentWindow.navigator;
        flag = true;
    } catch (e) {
        flag = false;
    } finally {
        iframe.remove();
    }
    return flag;
})()