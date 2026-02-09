(function (e) {
    function canPlayVideo(e, t) {
        var r = 'video/' + t;
        switch (e.canPlayType(r.replace("'", '"'))) {
            case 'probably':
                return 2;
            case 'maybe':
                return 1;
            case '':
                return 0;
            default:
                return 3;
        }
    }

    function canPlayAudio(e, t) {
        var r = 'audio/' + t;
        switch (e.canPlayType(r.replace("'", '"'))) {
            case 'probably':
                return 2;
            case 'maybe':
                return 1;
            case '':
                return 0;
            default:
                return 3;
        }
    }

    return function (e) {
        var t = [];
        return t[0] = e.document.createElement('video'),
            [canPlayVideo(t[0], 'webm; codecs="vp8, vorbis"'), canPlayVideo(t[0], 'mp4; codecs="avc1.42E01E"'), canPlayVideo(t[0], 'ogg; codecs="theora"')]
    }(e).concat(function (e) {
        var t = [];
        return t[0] = e.document.createElement('audio'),
            [canPlayAudio(t[0], 'aac'), canPlayAudio(t[0], 'x-m4a'), canPlayAudio(t[0], 'wav; codecs=1'), canPlayAudio(t[0], 'mpeg'), canPlayAudio(t[0], 'ogg; codecs="vorbis"')]
    }(e))
})(window)