//JSnice http://jsnice.org/
/**
 * @param {string} string
 * @return {?}
 */
function ENCRYPT(string) {
    /**
     * @param {number} value
     * @param {number} expectedNumberOfNonCommentArgs
     * @return {?}
     */
    function parseInt(value, expectedNumberOfNonCommentArgs) {
      return value << expectedNumberOfNonCommentArgs | value >>> 32 - expectedNumberOfNonCommentArgs;
    }
    /**
     * @param {number} a
     * @return {?}
     */
    function isArray(a) {
      var t;
      /** @type {string} */
      var optsData = "";
      /** @type {number} */
      t = 7;
      for (;t >= 0;t--) {
        optsData += (a >>> 4 * t & 15).toString(16);
      }
      return optsData;
    }
    var k;
    var i;
    var copies;
    var q;
    var g;
    var c;
    var l;
    var b;
    var $q;
    /** @type {Array} */
    var out = new Array(80);
    /** @type {number} */
    var e = 1732584193;
    /** @type {number} */
    var f = 4023233417;
    /** @type {number} */
    var p = 2562383102;
    /** @type {number} */
    var r = 271733878;
    /** @type {number} */
    var a = 3285377520;
    var msg_len = (string = function(string) {
      string = string.replace(/\r\n/g, "\n");
      /** @type {string} */
      var utftext = "";
      /** @type {number} */
      var n = 0;
      for (;n < string.length;n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else {
          if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(63 & c | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(63 & c | 128);
          }
        }
      }
      return utftext;
    }(string)).length;
    /** @type {Array} */
    var keys = new Array;
    /** @type {number} */
    i = 0;
    for (;i < msg_len - 3;i += 4) {
      /** @type {number} */
      copies = string.charCodeAt(i) << 24 | string.charCodeAt(i + 1) << 16 | string.charCodeAt(i + 2) << 8 | string.charCodeAt(i + 3);
      keys.push(copies);
    }
    switch(msg_len % 4) {
      case 0:
        /** @type {number} */
        i = 2147483648;
        break;
      case 1:
        /** @type {number} */
        i = string.charCodeAt(msg_len - 1) << 24 | 8388608;
        break;
      case 2:
        /** @type {number} */
        i = string.charCodeAt(msg_len - 2) << 24 | string.charCodeAt(msg_len - 1) << 16 | 32768;
        break;
      case 3:
        /** @type {number} */
        i = string.charCodeAt(msg_len - 3) << 24 | string.charCodeAt(msg_len - 2) << 16 | string.charCodeAt(msg_len - 1) << 8 | 128;
    }
    keys.push(i);
    for (;keys.length % 16 != 14;) {
      keys.push(0);
    }
    keys.push(msg_len >>> 29);
    keys.push(msg_len << 3 & 4294967295);
    /** @type {number} */
    k = 0;
    for (;k < keys.length;k += 16) {
      /** @type {number} */
      i = 0;
      for (;i < 16;i++) {
        out[i] = keys[k + i];
      }
      /** @type {number} */
      i = 16;
      for (;i <= 79;i++) {
        out[i] = parseInt(out[i - 3] ^ out[i - 8] ^ out[i - 14] ^ out[i - 16], 1);
      }
      /** @type {number} */
      q = e;
      /** @type {number} */
      g = f;
      /** @type {number} */
      c = p;
      /** @type {number} */
      l = r;
      /** @type {number} */
      b = a;
      /** @type {number} */
      i = 0;
      for (;i <= 19;i++) {
        /** @type {number} */
        $q = parseInt(q, 5) + (g & c | ~g & l) + b + out[i] + 1518500249 & 4294967295;
        b = l;
        l = c;
        c = parseInt(g, 30);
        /** @type {number} */
        g = q;
        /** @type {number} */
        q = $q;
      }
      /** @type {number} */
      i = 20;
      for (;i <= 39;i++) {
        /** @type {number} */
        $q = parseInt(q, 5) + (g ^ c ^ l) + b + out[i] + 1859775393 & 4294967295;
        b = l;
        l = c;
        c = parseInt(g, 30);
        /** @type {number} */
        g = q;
        /** @type {number} */
        q = $q;
      }
      /** @type {number} */
      i = 40;
      for (;i <= 59;i++) {
        /** @type {number} */
        $q = parseInt(q, 5) + (g & c | g & l | c & l) + b + out[i] + 2400959708 & 4294967295;
        b = l;
        l = c;
        c = parseInt(g, 30);
        /** @type {number} */
        g = q;
        /** @type {number} */
        q = $q;
      }
      /** @type {number} */
      i = 60;
      for (;i <= 79;i++) {
        /** @type {number} */
        $q = parseInt(q, 5) + (g ^ c ^ l) + b + out[i] + 3395469782 & 4294967295;
        b = l;
        l = c;
        c = parseInt(g, 30);
        /** @type {number} */
        g = q;
        /** @type {number} */
        q = $q;
      }
      /** @type {number} */
      e = e + q & 4294967295;
      /** @type {number} */
      f = f + g & 4294967295;
      /** @type {number} */
      p = p + c & 4294967295;
      /** @type {number} */
      r = r + l & 4294967295;
      /** @type {number} */
      a = a + b & 4294967295;
    }
    return($q = isArray(e) + isArray(f) + isArray(p) + isArray(r) + isArray(a)).toLowerCase();
  }
  