(function() {
	'use strict';

	let doc = document;
	let $body = doc.getElementsByTagName('body')[0];
	let $eightMain = doc.querySelector('.eight-main');
	
	// Back to the Cover view
	let backHome = function () {
		$body.className = 'home';
	};
	let $eightSign = doc.querySelector('.eight-sign');
	$eightSign.addEventListener('click', backHome);
	
	// Enter the Five view
	let switchToEntry2 = function () {
		CNP.util.scroll($eightMain, 0, 2000)
		.then(function(){
			$body.className = 'home is-exchanging five';
			setTimeout(function() {
				$body.className = 'home five';
			}, 10);
		});
	};
	let $board1 = doc.querySelector('.eight-main .signboard--2');
	$board1.addEventListener('click', switchToEntry2);

})();
