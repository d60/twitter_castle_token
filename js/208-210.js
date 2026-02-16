(function (window) {
    const linuxFontGroups = {
        "Ubuntu": [
            "Ubuntu",
            "Ubuntu Mono"
        ],
        "Cantarell": [
            "Cantarell"
        ],
        "Liberation": [
            "Liberation Sans",
            "Liberation Serif",
            "Liberation Mono"
        ],
        "TeX Gyre": [
            "TeX Gyre Adventor",
            "TeX Gyre Bonum",
            "TeX Gyre Heros",
            "TeX Gyre Schola"
        ],
        "Phetsarath OT": [
            "Phetsarath OT"
        ],
        "Garuda": [
            "Garuda"
        ],
        "Nimbus": [
            "Nimbus Sans L",
            "Nimbus Roman No9 L",
            "Nimbus Mono L"
        ],
        "Overpass": [
            "Overpass"
        ],
        "Red Hat": [
            "Red Hat Text",
            "Red Hat Display"
        ],
        "Free": [
            "FreeSans",
            "FreeSerif",
            "FreeMono"
        ],
        "Kinnari": [
            "Kinnari"
        ],
        "DejaVu": [
            "DejaVu Sans",
            "DejaVu Serif",
            "DejaVu Mono"
        ]
    };

    const macFontGroups = {
        "San Francisco": [
            "San Francisco"
        ],
        "Menlo": [
            "Menlo"
        ],
        "Chalkboard": [
            "Chalkboard"
        ],
        "Geneva": [
            "Geneva"
        ],
        "Optima": [
            "Optima"
        ],
        "American Typewriter": [
            "American Typewriter"
        ],
        "Apple Chancery": [
            "Apple Chancery"
        ],
        "Brush Script MT": [
            "Brush Script MT"
        ],
        "Hoefler Text": [
            "Hoefler Text"
        ],
        "Noteworthy": [
            "Noteworthy"
        ],
        "Kohinoor Devanagari": [
            "Kohinoor Devanagari"
        ],
        "PingFang SC": [
            "PingFang SC"
        ],
        "Songti SC": [
            "Songti SC"
        ],
        "Hiragino Kaku Gothic Pro": [
            "Hiragino Kaku Gothic Pro"
        ],
        "Hiragino Mincho Pro": [
            "Hiragino Mincho Pro"
        ]
    };

    const windowsFontGroups = {
        "Gabriola": [
            "Gabriola"
        ],
        "Segoe Print": [
            "Segoe Print"
        ],
        "Segoe Script": [
            "Segoe Script"
        ],
        "Candara": [
            "Candara"
        ],
        "Cambria": [
            "Cambria"
        ],
        "Consolas": [
            "Consolas"
        ],
        "Corbel": [
            "Corbel"
        ],
        "Leelawadee UI": [
            "Leelawadee UI"
        ],
        "Javanese Text": [
            "Javanese Text"
        ],
        "Segoe UI Historic": [
            "Segoe UI Historic"
        ],
        "Myanmar Text": [
            "Myanmar Text"
        ],
        "Ebrima": [
            "Ebrima"
        ],
        "Nirmala UI": [
            "Nirmala UI"
        ],
        "Sitka": [
            "Sitka"
        ],
        "Nyala": [
            "Nyala"
        ],
        "Estrangelo Edessa": [
            "Estrangelo Edessa"
        ]
    };

    function isFontAvailable(targetFontName) {
        const testString = "mmmmmmmmmmlli";
        const fontSize = "100px";
        const baseFonts = ["monospace", "sans-serif", "serif"];

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return false;

        function measure(font) {
            context.font = font;
            return context.measureText(testString).width;
        }

        const baseWidths = {};
        baseFonts.forEach(baseFont => {
            baseWidths[baseFont] = measure(`${fontSize} ${baseFont}`);
        });

        const widthWithMono = measure(`${fontSize} '${targetFontName}', monospace`);
        const widthWithSans = measure(`${fontSize} '${targetFontName}', sans-serif`);
        const widthWithSerif = measure(`${fontSize} '${targetFontName}', serif`);

        return (
            widthWithMono !== baseWidths["monospace"] ||
            widthWithSans !== baseWidths["sans-serif"] ||
            widthWithSerif !== baseWidths["serif"]
        );
    }

    function getScore(fontGroups) {
        let score = 0;
        Object.values(fontGroups).forEach(fontList => {
            const exists = fontList.some(fontName =>
                isFontAvailable(fontName)
            );
            if (exists) {
                score++;
            }
        });
        return score;
    }


    return [linuxFontGroups, macFontGroups, windowsFontGroups].map(getScore)
})(window);
