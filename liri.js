/* LIRI is a Language Interpretation and Recognition Interface.
It takes in an action request and an optional argument,
such as a movie-title, both using node's process.argv.
Action requests include retrieving venues from Bands In Town API,
song information from Spotify API, and movie information from OMDB.
LIRI also calls out to a random text file that can include any action or argument.
LIRI includes logging support both to the console and an output file, log.txt.
*/ 

// Required NPM modules and files.
// ____________________________________________________________________________________


require("dotenv").config();

// Used to access Twitter keys in local file, keys.js.
const keys = require('./keys');

// NPM module used to read the random.txt file.
const fs = require('fs');

// NPM module used to access OMDB API.
const axios = require('axios');

// NPM module used to formar time.
const moment = require('moment');

// NPM module used to access Spotify API.
var Spotify = require('node-spotify-api');

// Output file for logs.
var filename = './log.txt';

// Controller and required parameters.
// ____________________________________________________________________________________

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var query = process.argv.slice(3).join("+");

const bitID = 'dbef0442baec91a6d042e1d59fa5596a';

var divider =
            "\n------------------------\n";

// Class that contains necessary methods to perfom each command line request
class Search {
    // Uses BandsInTown API
    fetchArtist(artist){
        var bitURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${bitID}`;

        // Make a request for a user with a given ID
        axios.get(bitURL)
        .then(function (response) {
            
            var location = response.data[0].venue.city + ", " + response.data[0].venue.country;
            
            var time = moment(response.data[0].datetime).format('MM/DD/YYYY');
            
            console.log(response.status);
            console.log();

            var result = [
                "Name of venue: " + response.data[0].venue.name,
                "location: " + location,
                "date: " + time
            ].join("\n");

            console.log(result);
            console.log();

            // log command
            search.logCommand(result);
        })
        .catch(function (error) {
            console.log(error);
        });
        
    };
    // Uses Spotify API
    spotifySong(song){
        var preview = "";
        if(song){
            spotify.search({ type: 'track', query: song, limit: 1 }, function(err, data) {
                if (err) return console.log('Error occurred: ' + err);
                if(data.tracks.items[0].preview_url != null) preview = data.tracks.items[0].preview_url; 

                console.log();

                var result = [
                    "artist: " +  data.tracks.items[0].album.artists[0].name,
                    "song: " + data.tracks.items[0].name,
                    "preview_url: " + preview,
                    "album_name: " + data.tracks.items[0].album.name
                ].join("\n");

                console.log(result);
                console.log();

                // log command
                search.logCommand(result);
            });
        }
        // Provide default song if no song was entered
        else {
            spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function(err, data) {
                if (err) return console.log('Error occurred: ' + err);
                if(data.tracks.items[0].preview_url != null) preview = data.tracks.items[0].preview_url; 

                console.log();

                var result = [
                    "artist: " +  data.tracks.items[0].album.artists[0].name,
                    "song: " + data.tracks.items[0].name,
                    "preview_url: " + preview,
                    "album_name: " + data.tracks.items[0].album.name
                ].join("\n");

                console.log(result);
                console.log();

                // log command
                search.logCommand(result);

            });
        }

        
    }
    // Uses OMDB API
    fetchMovie(movie){
        if(movie){
            var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            axios.get(omdbURL)
            .then(function (response) {
                var i = 0;
                var temp = [];
                do{
                    var rottenTomatoes = response.data.Ratings[i].Source;
                    var ratingRottenTomatoes = "";
                    
                    if(rottenTomatoes === 'Rotten Tomatoes'){
                        temp.push(response.data.Ratings[i].Value);
                    }
                    i++;
                    
                }
                while(i < response.data.Ratings.length);

                console.log();

                var result = [
                    "Title: " +  response.data.Title,
                    "Year: " + response.data.Year,
                    "imdbRating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot: " + response.data.Plot,
                    "Actors: " + response.data.Actors,
                    "Rotten Tomatoes: " + temp[0]
                ].join("\n");

                console.log(result);
                console.log();

                // log command
                search.logCommand(result);
                
            })
            .catch(function (error) {
                    console.log(error);
            });
        }
        // Provide default movie if no song was entered
        else{
            movie = 'Mr. Nobody';
            var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
            axios.get(omdbURL)
            .then(function (response) {
                var i = 0;
                var temp = [];
                do{
                    var rottenTomatoes = response.data.Ratings[i].Source;
                    var ratingRottenTomatoes = "";
                    
                    if(rottenTomatoes === 'Rotten Tomatoes'){
                        temp.push(response.data.Ratings[i].Value);
                    }
                    i++;
                    
                }
                while(i < response.data.Ratings.length);

                console.log();

                var result = [
                    "Title: " +  response.data.Title,
                    "Year: " + response.data.Year,
                    "imdbRating: " + response.data.imdbRating,
                    "Country: " + response.data.Country,
                    "Language: " + response.data.Language,
                    "Plot: " + response.data.Plot,
                    "Actors: " + response.data.Actors,
                    "Rotten Tomatoes: " + temp[0]
                ].join("\n");

                console.log(result);
                console.log();

                // log command
                search.logCommand(result);
                
            })
            .catch(function (error) {
                    console.log(error);
            });
        }
    }
    doWhatItSays(){
        var res = "";
        fs.readFile('random.txt', 'utf-8', function(err, txt){
            if(err)
                console.log(err);
            else{
                var doitsays = 'do-what-it-says';
                res = txt.split(',');
                command = res[0];
                var temp = "";
                if(command != doitsays){
                    temp = res[1];
                    query =  temp.replace(/['"]+/g, '');
                    fetchCommand();
                }
                else console.log("infinite");
            }
        });
    }
    // Logs data to the terminal and output to a text file.
    logCommand(result){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = mm + '/' + dd + '/' + yyyy;
        var message = `logging ${command} on ${today} \n`;

        var log = message + result;
        fs.appendFile(filename, log + divider, function(err){
            if(err){
    
            }
            else{
                console.log("command logged!");
            }
        });
    }
}

const search = new Search();
fetchCommand();

// Function used to determin which action to take.
function fetchCommand(){
    if(command != undefined){
        switch (command)
        {
            case "concert-this":
                search.fetchArtist(query);
                break;
            case "spotify-this-song":
                search.spotifySong(query);
                break;
            case "movie-this":
                search.fetchMovie(query);
                break;
            case "do-what-it-says":
                search.doWhatItSays();
                break;
            default: 
                console.log("sorry wrong command");
        }
    }
    else {
        console.log("sorry wrong command");
    }
}



