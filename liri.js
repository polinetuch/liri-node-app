var Spotify = require("node-spotify-api");
var request = require("request");
var dotenv = require("dotenv");

var Spotify = require("node-spotify-api");

// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });

Spotify.search({ type: "track", query: "All the Small Things" })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
