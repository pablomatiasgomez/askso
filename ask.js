#!/usr/bin/env node

var request = require('request');
var cheerio = require('cheerio');

var Q = process.argv.slice(2).concat(" ");
Q += " site:stackoverflow.com";
var url = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + encodeURIComponent(Q);

request(url, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		var body = JSON.parse(body);

		// TODO check if empty results
		var soUrl = body.responseData.results[0].url;
		console.log("SOURL", soUrl);
		request(soUrl, function(error, response, body) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);
				var question = $("body #question-header a").text();
				var answer = $("body #answers .answer").first().find(".post-text").text();
				
				console.log("\n\n----------------------- QUESTION -----------------------");
				console.log(question);
				console.log("\n\n-----------------------  ANSWER  -----------------------");
				console.log(answer);
			}
		});
	}
});
