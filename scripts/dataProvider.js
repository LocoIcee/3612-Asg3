const path = require('path');
const fs = require('fs');

const jsonArtists = path.join(__dirname, '../data', 'artists.json');
const jsonGalleries = path.join(__dirname, '../data', 'galleries.json');
const jsonPaintings = path.join(__dirname, '../data', 'paintings-nested.json');

const jsonAData = fs.readFileSync(jsonArtists, 'utf8');
const jsonGData = fs.readFileSync(jsonGalleries, 'utf8');
const jsonPData = fs.readFileSync(jsonPaintings, 'utf8');

const artistsData = JSON.parse(jsonAData);
const galleriesData = JSON.parse(jsonGData);
const paintingsData = JSON.parse(jsonPData);

module.exports = {
    artistsData, galleriesData, paintingsData
};
