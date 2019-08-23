// Files required
require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var Spotify = require("node-spotify-api");

var moment = require("moment");
moment().format();

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

// Bands In Town API
function concertThis() {
  var artist = userSearch;
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    console.log("==========================");
    console.log(response);
    console.log("==========================");
    console.log(
      "Venue name: " +
        response.data[0].venue.name +
        "\nVenue location: " +
        response.data[0].venue.city +
        "\nDate of the Event: " +
        moment(response.data[0].datetime).format("MM-DD-YYYY")
    );
  });
}

function spotifyThis(userSearch) {
  var spotify = new Spotify(keys.spotify);
  if (!userSearch) {
    userSearch = "The Sign by Ace of Base";
  }
  spotify
    .search({ type: "track", query: userSearch })
    .then(function(response) {
      console.log("\n======================");
      console.log(
        "\nArtist: " +
          response.tracks.items[0].album.artists[0].name +
          "\nSong: " +
          response.tracks.items[0].name +
          "\nSong preview: " +
          response.tracks.items[0].href +
          "\nAlbum: " +
          response.tracks.items[0].album.name
      );
      console.log("\n======================");
    })
    .catch(function(err) {
      console.log("Error: " + err);
    });
}

// OMDB API
function movieThis(userSearch) {
  if (userSearch === "") {
    userSearch = "Mr. Nobody";
  }
  axios
    .get(
      "https://www.omdbapi.com/?t=" +
        userSearch +
        "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("\n======================");
      console.log(
        "\nMovie: " +
          response.data.Title +
          "\nYear: " +
          response.data.Year +
          "\nRating: " +
          response.data.imdbRating +
          "\nCountry: " +
          response.data.Country +
          "\nLanguage: " +
          response.data.Language +
          "\nPlot: " +
          response.data.Plot +
          "\nActors: " +
          response.data.Actors
      );
      console.log("\n======================");
    })
    .catch(function(error) {
      console.log("Movie Search Error: " + error);
    });
}

// Do What It Says Function
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return err;
    }
  });
}
