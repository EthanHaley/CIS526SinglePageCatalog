/*function loadIndex() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/entry/');
	xhr.send(null);
	xhr.onreadystatechange = function() {
		var DONE = 4;
		var OK = 200;
		if(xhr.readState === DONE) {
			if(xhr.status === OK) {
				console.log(xhr.responseText);
				var entries = JSON.parse(xhr.responseText);
				entries.forEach(function(entry) {
					var name = document.createElement('a');
					name.innerHTML = entry.name;
					name.href = "/entry/" + entry.id;
					document.body.appendChild(name);
					entry.onClick = function(event) {
						event.preventDefault();
						loadEntry(name.href);
					}
				});
				//form = entryForm();
				//document.body.appendChild(form);
				$('<button>').text('Add Entry').on('click', function() {
					$('body').load('/public/form.html', function() {
						$('form').on('submit', function(event) {
							event.preventDefault();
							var data = new FormData($('form')[0]);
							$.post({
								url:'/entry',
								data: data,
								contentType: 'multipart/form-data',
								processData: false
							});
						});
					});
				});	
			} else {
				console.log('Error: ' + xhr.status);
			}
		}
	}
}*/

function loadIndex() {
	$.get('/entry', function(entries, status) {
		if(status == 'success') {
			$('body').clear();
			entries.forEach(function(entry) {
				var link = $('a')
					.text(entry.name)
					.attr('href', '/entry/' + entry.id)
					.on('click', function(e) {
						e.preventDefault();
						loadEntry('/entry/' + entry.id);
					});
			});
		}
	});
}

function loadEntry(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		var DONE = 4; // readyState 4 means the request is done.
		var OK = 200; // status 200 is a successful return.
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				console.log(xhr.responseText); // 'This is the returned text.'
				var entry = JSON.parse(xhr.responseText);
				var wrapper = document.createElement('div');
				var name = document.createElement('h2');
				var image = document.createElement('img');
				var description = document.createElement('p');
				name.innerHTML = entry.name;
				image.src = entry.image;
				description.innerHTML = entry.description;
				wrapper.appendChild(name);
				wrapper.appendChild(image);
				wrappter.appendChild(description);
				document.body.appendChild(wrapper);
			} else {
			  console.log('Error: ' + xhr.status); // An error occurred during the request.
			}
		}
	}
}

function entryForm() {
	return '<form action="/entry/" method=POST">' +
		'	<label for="name"> Name: ' +
		'		<input name="name" type="text" />' +
		'	</label>' +
		'	<label for="description" type="text"> Description: ' +
		'		<input name="description" type="text" />' +
		'	</label>' +
		'	<label for="image" type="file"> Image: ' +
		'		<input name="image" type="file" />' +
		'	</label>' +
		'	<input type="submit" value="Add Entry" />' +
		'</form>';
}

loadIndex();