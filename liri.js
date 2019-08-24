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
var liri = function(commands, userSearch) {
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
};

// Bands In Town API
function concertThis() {
  var artist = userSearch;
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    var concert = response.data;
    // console.log(concert);
    for (var i = 0; i < concert.length && i < 5; i++) {
      console.log(
        "\nVenue name: " +
          concert[i].venue.name +
          "\nVenue location: " +
          concert[i].venue.city +
          "\nDate of the Event: " +
          moment(concert[i].datetime).format("MM-DD-YYYY") +
          "\n=========================="
      );
    }
  });
}

function spotifyThis(userSearch) {
  var spotify = new Spotify(keys.spotify);
  if (!userSearch) {
    userSearch = "Shotgun";
  }
  return spotify
    .search({ type: "track", query: userSearch })
    .then(function(response) {
      var spotifyResult = response.tracks.items;
      console.log(spotifyResult);
      for (var j = 0; j < spotifyResult.length && j < 5; j++) {
        var apiResponse = spotifyResult[j];
        console.log(
          "\n======================" +
            "\nArtist: " +
            apiResponse.artists[0].name +
            "\nSong: " +
            apiResponse.name +
            "\nSong preview: " +
            apiResponse.preview_url +
            "\nAlbum: " +
            apiResponse.album.name
        );
      }
    })
    .catch(function(error) {
      console.log("Error: " + error);
    });
}

// OMDB API
function movieThis(userSearch) {
  if (!userSearch) {
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
          "\nRotten Tomatoes Rating: " +
          response.data.Ratings[1].Value +
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
    if (err) return err;
    console.log(data);

    var randomTxt = data.split(",");

    if (randomTxt.length == 2) {
      liri(randomTxt[0], randomTxt[1]);
    }
    // var commands = data.split("\n");
    // console.log({ commands });

    // commands.forEach(function(commandStr) {
    //   var args = commandStr.split(", ");
    //   var operation = args[0];
    //   var searchTerm = args[1];

    //   if (operation === "spotify-this-song") {
    //     spotifyThis(searchTerm);
    //   } else movieThis(searchTerm);
    // });
  });
}

liri(commands, userSearch);
