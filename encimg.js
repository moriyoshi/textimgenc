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
function encimg(str) {
    function toutf8(str) {
        var buf = [];
        for (var i = 0; i < str.length; i++) {
            var c = 0|str.charCodeAt(i);
            if (c < 0x80) {
                buf.push(c);
            } else if (c < 0x800) {
                buf.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
            } else if (c < 0x10000) {
                buf.push(0xe0 | (c >> 12),
                         0x80 | ((c >> 6) & 0x3f),
                         0x80 | (c & 0x3f));
            } else {
                buf.push(0xf0 | (c >> 18),
                         0x80 | ((c >> 12) & 0x3f),
                         0x80 | ((c >> 6) & 0x3f),
                         0x80 | (c & 0x3f));
            }
        }
        return buf;
    }
    var buf = toutf8(str);
    var cv = document.createElement('canvas');
    var width = Math.max((buf.length + 2) / 3, 1);
    cv.width = width;
    cv.height = 1;
    var ctx = cv.getContext('2d');
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillRect(0, 0, width, 1);
    var imd = ctx.getImageData(0, 0, width, 1), imdd = imd.data;
    for (var i = 0, j = 0; i < buf.length; i++) {
        imdd[j++] = buf[i];
        if (!(j & 3 ^ 3))
            imdd[j++] = 0xff;
    }
    ctx.putImageData(imd, 0, 0);
    return cv.toDataURL('image/png');
}
