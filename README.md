# liri-node-app

LIRI is a Language Interpretation and Recognition Interface.
Use LIRI to get your latest artits information, find out about a song,
or a movie, or just choose a random action from your own random file.

## Demo
[Click Here](https://drive.google.com/file/d/1WAro21_q9WY1yDieN3jAVJKe45JJNRov/view)

## Log
[Log.txt](https://github.com/andresjoelv/liri-node-app/blob/master/log.txt)

## Installs

The [package.json](https://github.com/andresjoelv/liri-node-app/blob/master/package.json)
lists dependent node packages, but for your convenvice, these are the ones to install.

### Moment

`npm install moment`

### Spotify

`npm install spotify`

### Axios

`npm install axios`

### FS

`npm install fs`

## Get Started

Here's a quick rundom of the commands you can use in LIRI.

### Get Artist

Retrieves bands in town:

`node liri.js concert-this`

### Get Song Info

Retrieves song information for a track:

`node liri.js spotify-this-song "Paranoid"`

### Get Movie Info

Retrieves movie information for a movie:

`node liri.js movie-this "Cars"`

### Get Random Info

Gets random text inside a file and does what it says:

`node liri.js do-what-it-says`
