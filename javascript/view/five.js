(function() {
	'use strict';

	let doc = document;
	let $body = doc.getElementsByTagName('body')[0];
	let $fiveMain = doc.querySelector('.five-main');
	
	// Back to the Cover view
	let backHome = function () {
		$body.className = 'home';
	};
	let $fiveSign = doc.querySelector('.five-sign');
	$fiveSign.addEventListener('click', backHome);
	
	// Enter the Five view
	let switchToEntry1 = function () {
		CNP.util.scroll($fiveMain, 0, 2000)
		.then(function(){
			$body.className = 'home is-exchanging eight';
			setTimeout(function() {
				$body.className = 'home eight';
			}, 10);
		});
	};
	let $board1 = doc.querySelector('.five-main .signboard--1');
	$board1.addEventListener('click', switchToEntry1);

})();
