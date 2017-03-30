module.exports = {
	list;
}
function list(entries) {
	var table = $('<table>').addClass('table');
	var head = $('<tr>').append('<th>Name</th>').appendTo(table);
	entries.forEach(entry) {
		var row = $('<tr>').append(
			$('<td>').text(entry.name);
		).appendTo(table);
	}
	return table;
}