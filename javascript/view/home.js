(function() {
	'use strict';
	
	let doc = document;
	let $body = doc.getElementsByTagName('body')[0];
	let $eightMain = doc.querySelector('.eight-main');
	let $fiveMain = doc.querySelector('.five-main');
	
	let showEntry1 = function() {
		$body.classList.add('eight');
		
		// If Safari on Mac, fix scrolling issue
		if (CNP.util.uaIs('Macintosh') && CNP.util.uaIs('Safari') && !CNP.util.uaIs('Chrome')) {
			$eightMain.addEventListener('transitionend', CNP.util.fixSafariScrollY);
		}
	};
	let showEntry2 = function() {
		$body.classList.add('five');
		
		// If Safari on Mac, fix scrolling issue
		if (CNP.util.uaIs('Macintosh') && CNP.util.uaIs('Safari') && !CNP.util.uaIs('Chrome')) {
			$fiveMain.addEventListener('transitionend', CNP.util.fixSafariScrollY);
		}
	};
	
	let $entry1 = doc.querySelector('.home-entry--1');
	$entry1.addEventListener('click', showEntry1);
	
	let $entry2 = doc.querySelector('.home-entry--2');
	$entry2.addEventListener('click', showEntry2);

})();
