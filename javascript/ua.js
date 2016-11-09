(function() {
	'use strict';
	
	let doc = document;
	
	const UA_LIST = ['Chrome', 'iPhone', 'iPad', 'Macintosh', 'MQQBrowser', 'Safari'];
	let ua = navigator.userAgent;
	let $html = doc.getElementsByTagName('html')[0];
	
	for (let i = 0; i < UA_LIST.length; i++) {
		let uaRegExp = new RegExp(UA_LIST[i]);
		
		if (ua.match(uaRegExp)) {
			$html.classList.add('ua-' + UA_LIST[i]);
		}
	}

})();
