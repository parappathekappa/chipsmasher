thetags = {};
writemessage();

// Determine the date, assume 3 days ago
var d = new Date();
var weekday = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
var theday = weekday[d.getDay()-3];

// Button press callback
$('.button').click(function(e) {
	e.preventDefault();
	$(this).addClass('pressed');

	// Find the other buttons under this parent and remove class
	$(this).siblings().removeClass('pressed');
	writemessage();
});

$('.select').change(function(e) {
	writemessage();
});

$('.input').on('input', function() {
	writemessage();
});

function writemessage() {

	if ($('#whatswrong').val() != 'diseased') {
		$('#q4,#q5')
			.find('.button, .input')
			.removeClass('pressed')
			.val('')
			.prop('disabled', true);
	} else {
		$('#q4,#q5')
			.find('.button, .input')
			.prop('disabled', false);
	}

	number = $('.nbutton.pressed').text();
	if (number == "1") {
		$('#q3')
			.find('.qtext')
			.html('What\'s wrong with it?');
		thetags['number'] = "a";
		thetags['number2'] = "is";
		thetags['number3'] = "needs";
		thetags['number4'] = "has";
		thetags['number5'] = "It";
		thetags['number6'] = "it";
		thetags['tree'] = "tree";
	} else if (number == "2") {
		$('#q3')
			.find('.qtext')
			.html('What\'s wrong with them?');
		thetags['number'] = "a couple";
		thetags['number2'] = "are";
		thetags['number3'] = "need";
		thetags['number4'] = "have";
		thetags['number5'] = "They";
		thetags['number6'] = "them";
		thetags['tree'] = "trees";
	} else {
		$('#q3')
			.find('.qtext')
			.html('What\'s wrong with them?');
		thetags['number'] = "some";
		thetags['number2'] = "are";
		thetags['number3'] = "need";
		thetags['number4'] = "have";
		thetags['number5'] = "They";
		thetags['number6'] = "them";
		thetags['tree'] = "trees";
	}

	species = $('#species_input').val();
	if (species.length) {
		species = capitalize(species);
	}
	if (!species.length) {
		thetags['species'] = thetags['tree'];
	} else {
		thetags['species'] = species + ' ' + thetags['tree'];
	}

	problem = $('#whatswrong').val();

	if (problem == 'dead') {
		thetags['problem'] = 'that ' + thetags['number2'] + ' dead';
		thetags['treatment'] = 'remove the ' + thetags['tree'];
	} else if (problem == 'wildhairs') {
		thetags['problem'] = 'that ' + thetags['number3'] + ' some pruning';
		thetags['treatment'] = 'prune ' + thetags['number6'];
	} else if (problem == 'hazardlimbs') {
		thetags['problem'] = thetags['number4'] + ' some hazardous limbs that could fall the next time the wind picks up';
		thetags['treatment'] = 'remove the problem limbs';
	} else if (problem == 'diseased') {
		disease = $('#disease_input').val();
		if (disease.length) {
			disease = capitalize(disease);
		}
		treatment = $('.rbutton.pressed').text();

		if (!disease.length) {
			thetags['problem'] = 'that ' + thetags['number2'] + ' diseased.  ';
		} else {
			thetags['problem'] = 'with ' + disease + ' disease.  ';
		}

		if (treatment == 'Treat') {
			thetags['problem'] += thetags['number5'] + ' should probably be treated sooner rather than later';
			thetags['treatment'] = 'do the treatment';
		} else {
			thetags['problem'] += thetags['number5'] + ' should probably be removed to avoid it spreading to other trees';
			thetags['treatment'] = 'remove the ' + thetags['tree'];
		}
	} else {
		thetags['problem'] = 'that ' + thetags['number3'] + ' some work';
		thetags['treatment'] = 'do the work';
	}
	
	payment = $('#price').val();
	if (!payment.length) {
		thetags['payment'] = 'the next time we\'re in the area';
	} else {
		thetags['payment'] = 'for about $' + payment;
	}
		
	try {
		first_letter = thetags['species'][0].toLowerCase();
		if (["a","e","i","o","u"].indexOf(first_letter) != -1 && thetags['number'] == "a") {
			thetags['number'] = "an";
		}
	} catch(err) {}

	// Generate the message
	m_problem = 'We were working by your house on Monday and noticed you have '
	m_problem += thetags['number'] + ' ' + thetags['species'] + ' in your yard ' + thetags['problem'] + '.';
	m_solution = 'We could ' + thetags['treatment'] + ' ' + thetags['payment'] + ' if you\'re interested.  Just give us a call or send us an email.';

	// Render the postcard text
	$('#problem').html(m_problem);
	$('#solution').html(m_solution);

}

function capitalize(thestring) {
	newstring = thestring.toLowerCase().replace(/\b[a-z]/g, function(letter) {
	    return letter.toUpperCase();
	});
	return newstring;
}