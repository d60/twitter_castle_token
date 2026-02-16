(function (e) {
    r = [[],[false,false,false]]
    var n = [];
    if (e)
        for (var i = 0, l = e; i < l.length; i++)
            n[0] = l[i],
                n[1] = n[0]['kind'],
                n[1] !== 'audioinput' && n[1] !== 'audio' || (r[1][0] = !0),
                n[1] === 'audioinput' && (r[1][1] = !0),
                n[1] !== 'videoinput' && n[1] !== 'video' || (r[1][2] = !0);
    return r[1];
})(await navigator.mediaDevices.enumerateDevices())

// await navigator.mediaDevices.enumerateDevices()