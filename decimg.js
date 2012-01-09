/*
 * Copyright (c) 2012 Moriyoshi Koizumi
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
function decimg(img) {
    var cv = document.createElement('canvas');
    cv.width = img.width;
    cv.height = img.height;
    var ctx = cv.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var imd = ctx.getImageData(0, 0, img.width, img.height);
    var s = '';
    var imdd = imd.data, imddl = imdd.length;
    var i = 0;
    for (;;) {
        if (i >= imddl)
            return s;
        var c1 = 0|imdd[i++];
        if (!c1)
            return s;
        i += !(i & 3 ^ 3);
        if (c1 < 0x80) {
            s += String.fromCharCode(c1);
        } else if (c1 < 0xc2) {
            break;
        } else if (c1 < 0xe0) {
            if (i >= imddl)
                break;
            var c2 = imdd[i++];
            i += !(i & 3 ^ 3);
            if (c2 < 0x80 || c2 >= 0xc0)
                break;
            s += String.fromCharCode(((c1 & 0x1f) << 6) | (c2 & 0x3f));
        } else if (c1 < 0xf0) {
            if (i >= imddl)
                break;
            var c2 = imdd[i++];
            i += !(i & 3 ^ 3);
            if (c2 < 0x80 || c2 >= 0xc0)
                break;
            if (i >= imddl)
                break;
            var c3 = imdd[i++];
            i += !(i & 3 ^ 3);
            if (c3 < 0x80 || c3 >= 0xc0)
                break;
            s += String.fromCharCode(((c1 & 0x0f) << 12) | ((c2 & 0x3f) << 6) | (c3 & 0x3f));
        } else if (c1 < 0xf8) {
            if (i >= imddl)
                break;
            var c2 = imdd[i++];
            i += !(i & 3 ^ 3);
            if (c2 < 0x80 || c2 >= 0xc0)
                break;
            if (i >= imddl)
                break;
            var c3 = imdd[i++];
            i += !(i & 3 ^ 3);
            if (c3 < 0x80 || c3 >= 0xc0)
                break;
            if (++i >= imddl)
                break;
            var c4 = imdd[i++];
            i += !(i & 3 ^ 3);
            if (c4 < 0x80 || c4 >= 0xc0)
                break;
            s += String.fromCharCode(((c1 & 0x07) << 18) | ((c2 & 0x3f) << 12) | ((c3 & 0x3f) << 6) | (c4 & 0x3f));
        } else {
            break;
        }
    }
    throw "Invalid byte sequence";
}
