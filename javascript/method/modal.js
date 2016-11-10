/*global Promise */

(function() {
	'use strict';
	
	CNP.modal = {
		init: function() {
			let self = this;
			let doc = document;
			
			let $body = doc.getElementsByTagName('body')[0];
			$body.addEventListener('click', function(e) {
				let $target = e.target;
				
				// Travel up until get a Close-Modal button or the modal wrap
				while ($target && !$target.matches('.modal-open, body')) {
					$target = $target.parentNode;
				}
				// Check if the click.target is a Close-Modal button
				if ($target && $target.matches('.modal-open')) {
					const URL = $target.getAttribute('data-url');
					self.open(URL);
				}
				
			});
			
			let $close = doc.querySelector('.modal-close');
			$close.addEventListener('click', self.close);
		},
		
		destroy: function() {
			let doc = document;
			
			let $content = doc.querySelector('.modal-content');
			$content.innerHTML = '';
		},
		
		open: function(URL) {
			let self = this;
			let doc = document;
			let $modal = doc.querySelector('.modal');
			
			$modal.classList.add('is-loading');
			// Click anywhere to close
			$modal.addEventListener('click', self.close);
			
			CNP.fetch.GET(URL).then(function(data) {
				self.update(data);
			}).then(function() {
				// setTimeout(function() {
				// 	$modal.classList.add('is-active');
				// }, 2000);
				$modal.classList.add('is-active');
			});
		},
		
		close: function() {
			let self = CNP.modal;
			let doc = document;
			
			let $modal = doc.querySelector('.modal');
			$modal.classList.remove('is-active', 'is-loading');
			setTimeout(self.destroy, 400);
		},
		
		update: function(data) {
			let self = this;
			let doc = document;
			
			let $content = doc.querySelector('.modal-content');
			$content.innerHTML = data;
			
			let $modal = doc.querySelector('.modal');
			$modal.removeEventListener('click', self.close);
			$modal.classList.remove('is-loading');
		}
	};

})();
