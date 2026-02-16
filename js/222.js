(function () {
    let element = window.document.createElement('div')
    element.setAttribute('style', 'height:100vh;width:100vw;overflow:scroll;position:absolute;top:-9999px;left:-9999px;visibility:hidden;z-index:-1;');
    let body = window.document.body;
    !function (e, t) {
        e && e.appendChild(t)
    }(body, element)
    let result = [
        element.offsetWidth - element.clientWidth,
        element.offsetHeight - element.clientHeight
    ]
    !function (e, t) {
        e && e.removeChild(t)
    } (body, element)
    return result
})()