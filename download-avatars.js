var request = require('request');
var fs = require('fs');
var token = require('./secrets');

var repoOwner = process.argv[2],
    repoName = process.argv[3];

if (!repoOwner || !repoName) {
  console.log("error, 2 arguments needed, i.e. node download_avatars.js <owner> <repo>");
  return
};

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(owner, name, cb) {
  var options = {
    url: "https://api.github.com/repos/" + owner + "/" + name + "/contributors",
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

getRepoContributors(repoOwner, repoName, function(err, results) {
  console.log("Errors:", err);
  var resultsInJson = JSON.parse(results); // array of contributors
  resultsInJson.forEach(function(currentValue) {
    var url = currentValue.avatar_url;
    console.log(url);
    var filePath = "./avatars/" + currentValue.login + ".jpg";
    console.log(filePath);
    // downloadImageByURL(url, filePath);
  });
});
