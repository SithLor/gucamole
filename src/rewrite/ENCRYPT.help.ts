// function n(e) {
//    var t, n = "";
//    for (t = 7; t >= 0; t--) {
//        n += (e >>> 4 * t & 15).toString(16);
//    }
//    return n;
// }
export function convertToHexString(numberToConvert) {
    var hexString = "";
    for (let i = 7; i >= 0; i--) {
        hexString += (numberToConvert >>> 4 * i & 15).toString(16);
    }
    return hexString;
}

export function rotateBits(e, t) {
    return e << t | e >>> 32 - t;
}
