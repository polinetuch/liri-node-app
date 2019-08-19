// Files required
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var axios = require("axios");

// input variable that takes in argument 2 for search function
var commands = process.argv[2];

var userSearch = process.argv.slice(3).join(" ");

// function liriRun(commands, userSearch) {
switch (commands) {
  case "spotify-this-song":
    spotifyThis(userSearch);
    break;
  case "concert-this":
    concertThis(userSearch);
    break;
  case "movie-this":
    movieThis(userSearch);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log(
      "Invalid command. Please spotify-this-song, concert-this, movie-this or do-what-it-says"
    );
}
// console.log(liriRun(commands, userSearch));

function spotifyThis(musicSearch) {
  var spotify = new Spotify(keys.spotify);

  if (!musicSearch) {
    musicSearch = "All Rise";
  }
  spotify.search({ type: "track", query: musicSearch }, function(error, data) {
    if (error) {
      return console.log(error);
    } else {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var musicSearch = data.tracks.items[i];
        console.log(musicSearch);
      }
    }
  });
}
// console.log(spotifyThis());

// Bands In Town API
function concertThis() {
  var artist = userSearch;
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    console.log(response.data[0].venue.name);
    console.log(response.data[0].venue.country);
    console.log("Venue location: " + response.data[0].venue.city);

    var date = response.data[0].datetime;

    console.log("Date of event: " + response.data[0].datetime);
  });
}

// OMDB API
// function movieThis() {}

// Do What It Says Function
// function doWhatItSays() {}
