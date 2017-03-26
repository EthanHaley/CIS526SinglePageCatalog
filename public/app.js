var xhr = new XMLHttpRequest();
xhr.open('GET', '/entries/');
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
				name.href = "/entries/" + entry.id;
				document.body.appendChild(name);
				entry.onClick = function(event) {
					event.preventDefault();
					alert("Load using Ajax");
				}
			});
		} else {
			console.log('Error: ' + xhr.status);
		}
	}
}