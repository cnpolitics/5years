(function() {
	'use strict';
	
	CNP.fetch = {
		GET: function(URL) {
			const GET_INIT = {
				method: 'GET',
				// mode: 'cors',
				// headers: {
				// 	'Pragma': 'no-cache',
				// 	'Cache-Control': 'no-cache',
				// },
			};
			
			return fetch(URL, GET_INIT).then(function(res) {
				if (res.ok) {
					return res.text();
				} else {
					let error = new Error(res.statusText);
					error.res = res;
					throw error;
				}
			});
		},
	};

})();
