var entry = require('./entry');

$.get('/entry', function(entries){
	$('body').html(entry.list(entries));
})