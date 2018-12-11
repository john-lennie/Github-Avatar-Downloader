var request = require('request');
var fs = require('fs');
var token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'john-lennie',
      'Authorization': token.GITHUB_TOKEN
    }
  };
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath))
}

getRepoContributors("jquery", "jquery", function(err, results) {
  console.log("Errors:", err);
  var resultsInJson = JSON.parse(results); // array of contributors
  resultsInJson.forEach(function(currentValue) {
    var url = currentValue.avatar_url;
    console.log(url);
    var filePath = "./avatars/" + currentValue.login + ".jpg";
    console.log(filePath);
    downloadImageByURL(url, filePath);
  });
});
