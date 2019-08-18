// Files required
var Spotify = require("node-spotify-api");
var request = require("request");
var dotenv = require("dotenv").config();

// input variable that takes in argument 2 for search function
var argvMusicSearch = process.argv[2];

// function spotifyThis(musicSearch) {
var spotify = new Spotify({
  id: "d0b25bc85d8242b9a93e2db403efedaa",
  secret: "5e54edb622bb4dc6bcd11bb3d9b9a085"
});

spotify.search({ type: "track", query: "Beautiful People" }, function(
  error,
  data
) {
  if (error) {
    return console.log(error);
  } else {
    console.log(data.tracks);
  }
});
