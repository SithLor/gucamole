function ENCRYPT(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t;
    }
    function n(e) {
        var t, n = "";
        for(t = 7; t >= 0; t--)n += (e >>> 4 * t & 15).toString(16);
        return n;
    }
    var o, i, r, s, a, c, l, d, u, h = new Array(80), f = 1732584193, w = 4023233417, g = 2562383102, p = 271733878, m = 3285377520, v = (e = function(e) {
        e = e.replace(/\r\n/g, "\n");
        for(var t = "", n = 0; n < e.length; n++){
            var o = e.charCodeAt(n);
            o < 128 ? t += String.fromCharCode(o) : o > 127 && o < 2048 ? (t += String.fromCharCode(o >> 6 | 192), t += String.fromCharCode(63 & o | 128)) : (t += String.fromCharCode(o >> 12 | 224), t += String.fromCharCode(o >> 6 & 63 | 128), t += String.fromCharCode(63 & o | 128));
        }
        return t;
    }(e)).length, y = new Array;
    for(i = 0; i < v - 3; i += 4)r = e.charCodeAt(i) << 24 | e.charCodeAt(i + 1) << 16 | e.charCodeAt(i + 2) << 8 | e.charCodeAt(i + 3), y.push(r);
    switch(v % 4){
        case 0:
            i = 2147483648;
            break;
        case 1:
            i = e.charCodeAt(v - 1) << 24 | 8388608;
            break;
        case 2:
            i = e.charCodeAt(v - 2) << 24 | e.charCodeAt(v - 1) << 16 | 32768;
            break;
        case 3:
            i = e.charCodeAt(v - 3) << 24 | e.charCodeAt(v - 2) << 16 | e.charCodeAt(v - 1) << 8 | 128;
    }
    for(y.push(i); y.length % 16 != 14;)y.push(0);
    for(y.push(v >>> 29), y.push(v << 3 & 4294967295), o = 0; o < y.length; o += 16){
        for(i = 0; i < 16; i++)h[i] = y[o + i];
        for(i = 16; i <= 79; i++)h[i] = t(h[i - 3] ^ h[i - 8] ^ h[i - 14] ^ h[i - 16], 1);
        for(s = f, a = w, c = g, l = p, d = m, i = 0; i <= 19; i++)u = t(s, 5) + (a & c | ~a & l) + d + h[i] + 1518500249 & 4294967295, d = l, l = c, c = t(a, 30), a = s, s = u;
        for(i = 20; i <= 39; i++)u = t(s, 5) + (a ^ c ^ l) + d + h[i] + 1859775393 & 4294967295, d = l, l = c, c = t(a, 30), a = s, s = u;
        for(i = 40; i <= 59; i++)u = t(s, 5) + (a & c | a & l | c & l) + d + h[i] + 2400959708 & 4294967295, d = l, l = c, c = t(a, 30), a = s, s = u;
        for(i = 60; i <= 79; i++)u = t(s, 5) + (a ^ c ^ l) + d + h[i] + 3395469782 & 4294967295, d = l, l = c, c = t(a, 30), a = s, s = u;
        f = f + s & 4294967295, w = w + a & 4294967295, g = g + c & 4294967295, p = p + l & 4294967295, m = m + d & 4294967295;
    }
    return (u = n(f) + n(w) + n(g) + n(p) + n(m)).toLowerCase();
}
