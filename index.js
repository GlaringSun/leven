/* eslint-disable no-nested-ternary */
'use strict';
var arr = [];
var charCodeCache = [];

(function () {
	var leven = function (a, b) {
		if (a === b) {
			return 0;
		}

		var swap = a;

		// Swapping the strings if `a` is longer than `b` so we know which one is the
		// shortest & which one is the longest
		if (a.length > b.length) {
			a = b;
			b = swap;
		}

		var aLen = a.length;
		var bLen = b.length;

		// Performing suffix trimming:
		// We can linearly drop suffix common to both strings since they
		// don't increase distance at all
		// Note: `~-` is the bitwise way to perform a `- 1` operation
		while (aLen > 0 && (a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen))) {
			aLen--;
			bLen--;
		}

		// Performing prefix trimming
		// We can linearly drop prefix common to both strings since they
		// don't increase distance at all
		var start = 0;

		while (start < aLen && (a.charCodeAt(start) === b.charCodeAt(start))) {
			start++;
		}

		aLen -= start;
		bLen -= start;

		if (aLen === 0) {
			return bLen;
		}

		var bCharCode;
		var ret;
		var tmp;
		var tmp2;
		var i = 0;
		var j = 0;

		while (i < aLen) {
			charCodeCache[i] = a.charCodeAt(start + i);
			arr[i] = ++i;
		}

		while (j < bLen) {
			bCharCode = b.charCodeAt(start + j);
			tmp = j++;
			ret = j;

			for (i = 0; i < aLen; i++) {
				tmp2 = bCharCode === charCodeCache[i] ? tmp : tmp + 1;
				tmp = arr[i];
				ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
			}
		}

		return ret;
	};

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = leven;
	} else if (typeof define === 'function' && define.amd) { // eslint-disable-line no-undef
		define('leven', function () { // eslint-disable-line no-undef
			return leven;
		});
	}
})();
