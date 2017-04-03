function loadIndex() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/entry');
  xhr.send(null);

  xhr.onreadystatechange = function() {
    var DONE = 4; 
    var OK = 200; 
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
      	$('body').empty();
        var entries = JSON.parse(xhr.responseText);
        entries.forEach(function(entry){
          var name = document.createElement('a');
          name.id = entry.id;
          name.innerHTML = entry.name;
          name.href = "/entry/" + entry.id;
          document.body.appendChild(name);
          document.getElementById(name.id).onclick = function(event) { 
          	event.preventDefault();
          	loadEntry(name.href);
          }
        });
        /*
        var form = document.createElement('form');
		form.setAttribute('method','post');
		var name = document.createElement('input');
		name.name = 'name';
		name.type = 'text';
		var description = document.createElement('input');
		description.name = 'description';
		description.type = 'text';
		var image = document.createElement('input');
		image.name = 'name';
		image.type = 'file';
		var addButton = document.createElement('input');
		addButton.type = 'submit';
		addButton.value = 'Add Entry';
		addButton.id = 'addButton';
		var nameLabel = document.createElement('label');
		nameLabel.innerHTML = '<label for="name" type="text">Name: </label>';
		var descLabel = document.createElement('label');
		descLabel.innerHTML = '<label for="description" type="text">Description: </label>';
		var imageLabel = document.createElement('label');
		imageLabel.innerHTML = '<label for="image" type="file">Image: </label>';
		form.appendChild(nameLabel);
		form.appendChild(name);
		form.appendChild(descLabel);
		form.appendChild(description);
		form.appendChild(imageLabel);
		form.appendChild(image);
		form.appendChild(addButton);
        $('body').append(form);
        document.getElementById('addButton').onclick = function(event, err) {
        	if(err) {
        		console.log(err);
        	}
        	event.preventDefault();
        	xhr.open('POST', '/projects/');

			// Set the content type
			xhr.setRequestHeader("Content-Type", "application/json");

			// Send the request (JSON body)
			xhr.send(JSON.stringify(project));
        }*/
        var formButton = document.createElement('input');
        formButton.value = 'Add New Entry';
        formButton.type = 'submit';
        formButton.id = 'formButton';
        $('body').append(formButton);
        formButton.onclick = function(event) {
        	event.preventDefault()
        	showForm();
        }
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
}

/*function loadIndex() {
	$.get('/entry', function(entries, status) {
		if(status == 'success') {
			console.log(entries);
			entries.forEach(function(entry) {
				var link = $('a')
					.text(entry.name)
					.attr('href', '/entry/' + entry.id)
					.on('click', function(e) {
						e.preventDefault();
						loadEntry('/entry/' + entry.id);
					});
					$('body').append(link);
					console.log(link);
			});

			$('entry-form').on('submit', function(event) {
				event.preventDefault();
				var data = new FormData($('form')[0]);
				$.post({
					url:'/entry',
					data: data,
					contentType: 'multipart/form-data',
					processData: false
				});
			});
		} else {
			$('entry-form').on('submit', function(event) {
				event.preventDefault();
				var data = new FormData($('form')[0]);
				$.post({
					url:'/entry',
					data: data,
					contentType: 'multipart/form-data',
					processData: false
				});
			});
		}
	});
}*/

function loadEntry(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send(null);

	xhr.onreadystatechange = function() {
		var DONE = 4; 
		var OK = 200; 
		if (xhr.readyState === DONE) {
			if (xhr.status === OK) {
				$('body').empty();
				var entry = JSON.parse(xhr.responseText);
				var wrapper = document.createElement('div');
				var name = document.createElement('h2');
				var description = document.createElement('p');
				//var image = document.createElement('img');
				name.innerHTML = entry.name;
				description.innerHTML = entry.description;
				//image.src = entry.image;
				wrapper.appendChild(name);
				//wrapper.appendChild(image);
				wrapper.appendChild(description);
				document.body.appendChild(wrapper);
				homeButton = document.createElement('input');
		        homeButton.value = ' Home ';
		        homeButton.type = 'submit';
		        homeButton.id = 'homeButton';
		        $('body').append(homeButton);
		        homeButton.onclick = function(event) {
		        	event.preventDefault()
		        	loadIndex();
		        }
			} else {
			  console.log('Error: ' + xhr.status); // An error occurred during the request.
			}
		}
	}
}

function showForm() {
	$('body').load('/form.html');
	$('entry-form').on('submit', function(event) {
		event.preventDefault();
		var data = new FormData($('form')[0]);
		$.post({
			url:'/entry',
			data: data,
			contentType: 'multipart/form-data',
			processData: false
		});
	});
}

loadIndex();