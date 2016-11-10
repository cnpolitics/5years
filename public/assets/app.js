/* global fetch */

// Global namespace for the New Money QA app
var CNP = CNP || {};

// Sub-namespace for the util methods
CNP.fetch = {};

// Sub-namespace for the modal methods
CNP.modal = {};

// Sub-namespace for the util methods
CNP.util = {};
(function () {
	'use strict';

	CNP.fetch = {
		GET: function GET(URL) {
			var GET_INIT = {
				method: 'GET'
			};

			return fetch(URL, GET_INIT).then(function (res) {
				if (res.ok) {
					return res.text();
				} else {
					var error = new Error(res.statusText);
					error.res = res;
					throw error;
				}
			});
		}
	};
})();
/*global Promise */

(function () {
	'use strict';

	CNP.modal = {
		init: function init() {
			var self = this;
			var doc = document;

			var $body = doc.getElementsByTagName('body')[0];
			$body.addEventListener('click', function (e) {
				var $target = e.target;

				// Travel up until get a Close-Modal button or the modal wrap
				while ($target && !$target.matches('.modal-open, body')) {
					$target = $target.parentNode;
				}
				// Check if the click.target is a Close-Modal button
				if ($target && $target.matches('.modal-open')) {
					var URL = $target.getAttribute('data-url');
					self.open(URL);
				}
			});

			var $close = doc.querySelector('.modal-close');
			$close.addEventListener('click', self.close);
		},

		destroy: function destroy() {
			var doc = document;

			var $content = doc.querySelector('.modal-content');
			$content.innerHTML = '';
		},

		open: function open(URL) {
			var self = this;
			var doc = document;
			var $modal = doc.querySelector('.modal');

			$modal.classList.add('is-loading');
			// Click anywhere to close
			$modal.addEventListener('click', self.close);

			CNP.fetch.GET(URL).then(function (data) {
				self.update(data);
			}).then(function () {
				// setTimeout(function() {
				// 	$modal.classList.add('is-active');
				// }, 2000);
				$modal.classList.add('is-active');
			});
		},

		close: function close() {
			var self = CNP.modal;
			var doc = document;

			var $modal = doc.querySelector('.modal');
			$modal.classList.remove('is-active', 'is-loading');
			setTimeout(self.destroy, 400);
		},

		update: function update(data) {
			var self = this;
			var doc = document;

			var $content = doc.querySelector('.modal-content');
			$content.innerHTML = data;

			var $modal = doc.querySelector('.modal');
			$modal.removeEventListener('click', self.close);
			$modal.classList.remove('is-loading');
		}
	};
})();
/*global Promise */

(function () {
	'use strict';

	CNP.util = {
		/**
   * Smoothy scrolling
   * 
   * Ref: https://coderwall.com/p/hujlhg/smooth-scrolling-without-jquery
   * 
   * @param {Object} element - The scrolled element
   * @param {Number} target - Target `scrollTop` value
   * @param {Number} duration - Scrolling duration
   * @returns {Promise} A Promise object after scroll ending
   */
		scroll: function scroll(element, target, duration) {
			target = Math.round(target);
			duration = Math.round(duration);
			if (duration < 0) {
				return Promise.reject("bad duration");
			}
			if (duration === 0) {
				element.scrollTop = target;
				return Promise.resolve();
			}

			var start_time = Date.now();
			var end_time = start_time + duration;

			var start_top = element.scrollTop;
			var distance = target - start_top;

			// based on http://en.wikipedia.org/wiki/Smoothstep
			var smooth_step = function smooth_step(start, end, point) {
				if (point <= start) {
					return 0;
				}
				if (point >= end) {
					return 1;
				}
				var x = (point - start) / (end - start); // interpolation
				return x * x * (3 - 2 * x);
			};

			return new Promise(function (resolve, reject) {
				// This is to keep track of where the element's scrollTop is
				// supposed to be, based on what we're doing
				var previous_top = element.scrollTop;

				// This is like a think function from a game loop
				var scroll_frame = function scroll_frame() {
					if (element.scrollTop != previous_top) {
						reject("interrupted");
						return;
					}

					// set the scrollTop for this frame
					var now = Date.now();
					var point = smooth_step(start_time, end_time, now);
					var frameTop = Math.round(start_top + distance * point);
					element.scrollTop = frameTop;

					// check if we're done!
					if (now >= end_time) {
						resolve();
						return;
					}

					// If we were supposed to scroll but didn't, then we
					// probably hit the limit, so consider it done; not
					// interrupted.
					if (element.scrollTop === previous_top && element.scrollTop !== frameTop) {
						resolve();
						return;
					}
					previous_top = element.scrollTop;

					// schedule next frame for execution
					setTimeout(scroll_frame, 0);
				};

				// boostrap the animation process
				setTimeout(scroll_frame, 0);
			});
		},

		/**
   * Ref: http://stackoverflow.com/a/28389320/3253041
   */
		fixSafariScrollY: function fixSafariScrollY(e) {
			// console.log('fix');
			e.target.style.overflowY = 'hidden';
			setTimeout(function () {
				e.target.style.overflowY = '';
				e.target.removeEventListener('transitionend', CNP.util.fixSafariScrollY);
			});
		},

		uaIs: function uaIs(uaString) {
			var $html = document.getElementsByTagName('html')[0];
			if ($html.classList.contains('ua-' + uaString)) {
				return true;
			} else {
				return false;
			}
		}
	};
})();
(function () {
	'use strict';

	var doc = document;

	// Enable the CSS `:active` interactions
	var $body = doc.getElementsByTagName('body')[0];
	$body.addEventListener('touchstart', function () {});

	CNP.modal.init();
})();
(function () {
	'use strict';

	var doc = document;

	var UA_LIST = ['Chrome', 'iPhone', 'iPad', 'Macintosh', 'MQQBrowser', 'Safari'];
	var ua = navigator.userAgent;
	var $html = doc.getElementsByTagName('html')[0];

	for (var i = 0; i < UA_LIST.length; i++) {
		var uaRegExp = new RegExp(UA_LIST[i]);

		if (ua.match(uaRegExp)) {
			$html.classList.add('ua-' + UA_LIST[i]);
		}
	}
})();
/**
 * Prepend list:
 * - _define.js
 * - method/*.js
 * - main.js
 * - ua.js
 * 
 * Append list:
 * - view/*.js
 */
(function () {
	'use strict';

	var doc = document;
	var $body = doc.getElementsByTagName('body')[0];
	var $fiveMain = doc.querySelector('.five-main');

	// Back to the Cover view
	var backHome = function backHome() {
		$body.className = 'home';
	};
	var $fiveSign = doc.querySelector('.five-sign');
	$fiveSign.addEventListener('click', backHome);

	// Enter the Five view
	var switchToEntry1 = function switchToEntry1() {
		CNP.util.scroll($fiveMain, 0, 2000).then(function () {
			$body.className = 'home eight';
		});
	};
	var $board1 = doc.querySelector('.five-main .signboard--1');
	$board1.addEventListener('click', switchToEntry1);
})();
(function () {
	'use strict';

	var doc = document;
	var $body = doc.getElementsByTagName('body')[0];
	var $fiveMain = doc.querySelector('.five-main');

	var showEntry1 = function showEntry1() {
		alert('entry1');
	};
	var showEntry2 = function showEntry2() {
		$body.classList.add('five');

		// If Safari on Mac, fix scrolling issue
		if (CNP.util.uaIs('Macintosh') && CNP.util.uaIs('Safari') && !CNP.util.uaIs('Chrome')) {
			$fiveMain.addEventListener('transitionend', CNP.util.fixSafariScrollY);
		}
	};

	var $entry1 = doc.querySelector('.home-entry--1');
	$entry1.addEventListener('click', showEntry1);

	var $entry2 = doc.querySelector('.home-entry--2');
	$entry2.addEventListener('click', showEntry2);
})();

//# sourceMappingURL=app.js.map