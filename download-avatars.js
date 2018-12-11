var request = require('request');
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

getRepoContributors("jquery", "jquery", function(err, results) {
  console.log("Errors:", err);
  var resultsInJson = JSON.parse(results);
  var avatarUrl = resultsInJson.forEach(function(currentValue) {
    console.log(currentValue.avatar_url);
  });
});
