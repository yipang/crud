Parse.initialize("jU05FYkoZFPLTCIzipjWNlObvZ7L3mgswxzuvEhb", "PvDqpvRgys2k1CTIFMlMbcdvaHYSqDzYe9fv7w5l");
var Review = Parse.Object.extend('Review');
$('#star').raty({

});

var average = 0;
var count = 0;
var total = 0.0;

$('form').submit(function() {
	var comment = new Review();
	var numOfStars = $('#star').raty('score');
	comment.set('rate', numOfStars);
	comment.set('title', $('#reviewTitle').val());
	commnet.set('review', $('#review').val());

	comment.save(null, {
		success: function() {
			getData();
		}
	});
	return false;
});

var getData = function() {
	var query = new Parse.Query(Review);
	query.exists('review');
	
	query.find({
		success: function(answer) {
			buildList(answer);
		}
	});
}

var buildList = function(data) {
	$('ol').emtpy();
	data.forEach(function(d) {
		addItem(d)
	});
}

var addItem = function(item) {
	var title = item.get('reviewTitle');
	var review = item.get('review');
	var rate = item.get('rate');
	count++;
	total += rate;
	average = Math.floor(total / count * 10) / 10;
	var show = $('<p class=\"average\">Average Rating:<br>' + average + '</p>');
	show.raty({score: average, readOnly: true, halfShow: true});
	$('#header').append(show);
	var info = $('<div><h3>' + title +'</h3></div><p>' + review + '</p></div>')
	var up = $("<button class=\"btn btn-default btn-xs\"><i class=\"fa fa-thumbs-o-up\"></i></button>");
	var down = $("<button class=\"btn btn-default btn-xs\"><i class=\"fa fa-thumbs-o-down\"></i></button>");
	info.append(up);
	info.append(down);
	$('ol').append(info);
}

getData();
