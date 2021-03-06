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
	comment.set('title', $('#title').val());
	comment.set('review', $('#review').val());
	
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
	$('#reviews').empty();
	data.forEach(function(d) {
		addItem(d)
	});
}

var addItem = function(item) {
	count++;
	var title = item.get('title');
	var review = item.get('review');
	var rate = item.get('rate');
	total += rate;

	var space = $('<div class="simpleReview"></div>');
	var showTitle = $('<h3>' + title + '</h3>');
	var showReview = $('<p>' + review + '</p>');
	var stars = $('<div class="starRating"></div>');

	var agree = $('<button class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-up"></i></button>');
	var disagree = $('<button class="btn btn-default btn-xs"><i class="fa fa-thumbs-o-down"></i></button>');
	var remove = $('<button class="btn-xs btn-danger"><span class="glyphicon glyphicon-remove"></span></button>');
	var avg = total / count;
	$('#averageRating').raty({
		score: avg,
		readOnly: true
	});
	space.append(stars);
	space.append(showTitle);
	space.append(showReview);
	space.append(agree);
	space.append(disagree);
	space.append(remove);
	$('#reviews').append(space);
	$('.starRating').raty({
		score:rate,
		readOnly: true
	});

	agree.click(function() {
		item.save(null, {
			success: getData
		});
	});
	disagree.click(function() {
		item.save(null, {
			success: getData
		});
	});
	remove.click(function() {
		item.destroy({
			success: getData
		})
	});

}

getData();