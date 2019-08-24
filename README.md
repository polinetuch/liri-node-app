# LIRI Node APP

##LIRI searches Spotify for songs, Bands in Town for concerts and OMDB for movies

##Overview: LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### View github page: https://github.com/polinetuch/liri-node-app

## How To Use:

Use node liri.js then run one of the following commands, then add search text:

- `concert-this`
- `spotify-this-song`
- `movie-this`
- `do-what-it-says`

### Command line examples:

- `node liri.js concert-this U2`
- `node liri.js spotify-this-song Beautiful People`
- `node liri.js movie-this Ponyo`

### When each of the commands is running, the following information will be displayed

1.  concert-this

    - Venue name
    - Venue location
    - Date of the Event

2.  spotify-this-song

    - Artist name
    - Song title
    - Song preview
    - Album

3.  movie-this

    - Movie title
    - Year released
    - IMDB rating
    - Rotten Tomatoes Rating
    - Country
    - Language of the movie
    - Plot
    - Actors

4.  do-what-it-says
    will read the random.txt file and excutes the command to print information of spotify-this-song and movie-this

## Technologies used:

1. Javascript
2. Node.js
3. Bands In Town API
4. Spotify API
5. OMDB API
