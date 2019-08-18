// Files required
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

// input variable that takes in argument 2 for search function
var argvMusicSearch = process.argv[2];

var spotify = new Spotify(keys.spotify);

spotify.search({ type: "track", query: "One Time" }, function(error, data) {
  if (error) {
    return console.log(error);
  } else {
    for (var i = 0; i < data.tracks.items.length && i < 5; i++) {
      console.log(data.tracks.items[i]);
    }
  }
});
