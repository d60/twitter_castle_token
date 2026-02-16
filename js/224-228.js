(function () {
    function detectOsFromVoices(voices) {
        const keywords = {
            macKeywords: ['lekha', 'alex', 'victoria', 'samantha'],
            winKeywords: ['microsoft'],
            crosKeywords: ['chrome os'],
            androidKeywords: ['android']
        };
        const matchers = [
            {
                osName: 'macOS',
                regex: new RegExp(keywords.macKeywords.join('|'), 'i')
            },
            {
                osName: 'Windows',
                regex: new RegExp(keywords.winKeywords.join('|'), 'i')
            },
            {
                osName: 'ChromeOS',
                regex: new RegExp(keywords.crosKeywords.join('|'), 'i')
            },
            {
                osName: 'Android',
                regex: new RegExp(keywords.androidKeywords.join('|'), 'i')
            }
        ];
        for (let i = 0; i < matchers.length; i++) {
            const matcher = matchers[i];
            const hasMatch = voices.some(voice => matcher.regex.test(voice.name));
            if (hasMatch) {
                return matcher.osName;
            }
        }
        return 'Other';
    }

    function analyzeAndReport(synth) {
        const voices = synth.getVoices();
        const defaultVoice = voices && voices.find(v => v.default);
        const result = {};

        if (defaultVoice) {
            result['uo'] = defaultVoice.lang.split('-')[0];
        }
        result['vo'] = voices.length;
        result['oo'] = voices.filter(function (v) {
            return v.localService;
        }).length;
        result['fo'] = voices.filter(function (v) {
            return v.name.includes('Google');
        }).length;
        result['eo'] = detectOsFromVoices(voices);
        return result;
    }

    return analyzeAndReport(window.speechSynthesis);
})();