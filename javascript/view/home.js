(function() {
	'use strict';
	
	let doc = document;
	let $body = doc.getElementsByTagName('body')[0];
	let $fiveMain = doc.querySelector('.five-main');
	
	let showEntry1 = function() {
		alert('entry1');
	};
	let showEntry2 = function() {
		$body.classList.add('five');
		$fiveMain.addEventListener('transitionend', CNP.util.fixSafariScrollY);
	};
	
	let $entry1 = doc.querySelector('.home-entry--1');
	$entry1.addEventListener('click', showEntry1);
	
	let $entry2 = doc.querySelector('.home-entry--2');
	$entry2.addEventListener('click', showEntry2);

})();
