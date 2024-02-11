export type PColor = [number, number, number]
export type ColorScheme = Array<PColor>

const hexToRGB = (hexString: string): PColor => {
    hexString = hexString.replace(/^#/, '')
    const bigint = parseInt(hexString, 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
}

export const scheme1: ColorScheme = [
    [0, 0, 0],
    [192, 202, 173],
    [157, 169, 160],
    [101, 76, 79],
    [178, 110, 99],
    [101, 76, 79]
]


export const scheme2: ColorScheme = [
    [0, 0, 0],
    [108, 88, 76],
    [157, 169, 160],
    [123, 143, 75],
    [108, 88, 76],
    [221, 229, 182],
    [173, 193, 120],
    [221, 229, 182]
]

export const blackGreyRed: ColorScheme = [
    [8, 7, 5],
    [64, 67, 78],
    [112, 38, 50],
    [166, 117, 71],
]

export const redToBrown: ColorScheme = [
    [0, 10, 0],
    [120, 1, 22],
    [247, 181, 56],
    [219, 124, 38],
    [216, 87, 42],
    [195, 47, 39],
]

export const whiteBlack: ColorScheme = [
    [255, 255, 255],
    [216, 87, 42]
]

export const blueOrangeBrown: ColorScheme = [         // white
    "#2E2E3A",           // a1
    "#FBB034",           // b1
    "#BC5D2E",           // c1
    "#BBB8B2",           // d1
    "#C3340F",           // a2
    "#585862",           // b2
    "#FBE0AC",           // c2
    "#D89D82",           // d2
    "#5C5E58",           // a3
    "#631807",           // b3
    "#E5E2E2"
].map(e => hexToRGB(e))

export const col3 = ["#5B5393",           // c1
    "#7CBB92",           // d1
    "#D890AF",           // a2
    "#5B5393",           // b2
    "#4E9C68",           // c2
    "#B45A81",
    "#3A3276",
    "#297C46",           // a1
    "#90305A",  // d2
    "#201858",           // a3
    "#105D2A"].map(e => hexToRGB(e))         // b3

export const col4 = [
    "#713E5A",           // a1
    "#63A375",           // b1
    "#EDC79B",           // c1
    "#D57A66",           // d1
    "#CA6680",           // a2
    "#9B778D",           // b2
    "#93BE9F",           // c2
    "#F7E5CD",           // d2
    "#E1A193",           // a3
    "#D993A7",           // b3
    "#75634B"].map(e => hexToRGB(e))        // c3

export const whiteAndOther: ColorScheme = [
    [255, 255, 255],
    [216, 87, 42]
]



export const blackAndWhite = (numStates: number): ColorScheme => {
    const interval = 255 / numStates
    return Array.from({ length: numStates }, (_, index) => {
        const val = Math.floor(index * interval)
        return [val, val, val]
    })
}


export const scheme3: ColorScheme = [
    { "name": "Dark purple",
     "hex": "231c35", 
     "rgb": [35, 28, 53],
      "cmyk": [34, 47, 0, 79],
       "hsb": [257, 47, 21], 
       "hsl": [257, 31, 16],
        "lab": [12, 10, -15] }, 
        { "name": "Space cadet", "hex": "2a2b47", "rgb": [42, 43, 71], "cmyk": [41, 39, 0, 72], "hsb": [238, 41, 28], "hsl": [238, 26, 22], "lab": [19, 8, -18] }, { "name": "English Violet", "hex": "484564", "rgb": [72, 69, 100], "cmyk": [28, 31, 0, 61], "hsb": [246, 31, 39], "hsl": [246, 18, 33], "lab": [31, 9, -18] }, { "name": "English Violet", "hex": "5b5271", "rgb": [91, 82, 113], "cmyk": [19, 27, 0, 56], "hsb": [257, 27, 44], "hsl": [257, 16, 38], "lab": [37, 11, -16] }, { "name": "Chinese Violet", "hex": "6e5774", "rgb": [110, 87, 116], "cmyk": [5, 25, 0, 55], "hsb": [288, 25, 45], "hsl": [288, 14, 40], "lab": [40, 15, -13] }
].map(e => {return e["rgb" ] as PColor})


export const scheme4: ColorScheme = [{"name":"Reseda green","hex":"716d3c","rgb":[113,109,60],"cmyk":[0,4,47,56],"hsb":[55,47,44],"hsl":[55,31,34],"lab":[45,-6,28]},{"name":"Harvest gold","hex":"ce891e","rgb":[206,137,30],"cmyk":[0,33,85,19],"hsb":[36,85,81],"hsl":[36,75,46],"lab":[63,18,62]}, {"name":"Xanthous","hex":"e9b136","rgb":[233,177,54],"cmyk":[0,24,77,9],"hsb":[41,77,91],"hsl":[41,80,56],"lab":[75,9,67]},{"name":"Coffee","hex":"6d4f38","rgb":[109,79,56],"cmyk":[0,28,49,57],"hsb":[26,49,43],"hsl":[26,32,32],"lab":[36,9,19]},{"name":"Bistre","hex":"422716","rgb":[66,39,22],"cmyk":[0,41,67,74],"hsb":[23,67,26],"hsl":[23,50,17],"lab":[19,11,16]},{"name":"Olive","hex":"807f40","rgb":[128,127,64],"cmyk":[0,1,50,50],"hsb":[59,50,50],"hsl":[59,33,38],"lab":[52,-9,34]},].map(e => {return e["rgb" ] as PColor})