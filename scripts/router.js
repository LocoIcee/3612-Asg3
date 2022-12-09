const data = require('./dataProvider.js');

const handleAPI = app => {
    app.get('/api', (req,resp) => {resp.json({"message":"Please provide the apporprate api path for either artists, galleries, or paintings"})});
}

const handleCategory = app =>{
    app.get('/api/:category', (req,resp) => {
        let reply
        if (req.params.category === "artists"){
            reply = data.artistsData
        } else if (req.params.category === "galleries"){
            reply = data.galleriesData
        } else if (req.params.category === "paintings"){
            reply = data.paintingsData
        } else {
            reply = {"message":"Path not valid"}
        }
        resp.json(reply)
    });
}


const handleSearch = app => {
    app.get('/api/:category/:param', (req,resp) => {
        let matches = 0
        if (req.params.category === "artists"){  //search aritist country
            matches = data.artistsData.filter(d => d.Nationality.toLowerCase() === req.params.param.toLowerCase());
        } else if (req.params.category === "galleries"){ //search gallery country
            matches = data.galleriesData.filter(d => d.GalleryCountry.toLowerCase() === req.params.param.toLowerCase());
        } else if (req.params.category === "painting"){ //search paintings ID
            matches = data.paintingsData.filter(d => d.paintingID.toString() === req.params.param);
        }
        if (matches.length > 0)
            resp.json(matches);
        else
            resp.json({"message":"Nothing found for provided search"});
    });
};

const handleInPainting = app => {
    app.get('/api/painting/:category/:param', (req,resp) => {
        
        const matches = data.paintingsData.filter(d => {
            
            if (req.params.category === "artist"){ //search for artist ID
                return d.artist.artistID.toString() === req.params.param
            } else if (req.params.category === "gallery"){  //search for gallery ID
                return d.gallery.galleryID.toString() === req.params.param
            } else if (req.params.category === "title"){  //search sub/sting in title
                return d.title.toLowerCase().includes(req.params.param.toLowerCase())
            } else if (req.params.category === "color"){  //search for the color
                let found = 0;
                d.details.annotation.dominantColors.forEach(c => {
                    if (c.name.toString().toLowerCase() === req.params.param.toLowerCase()){
                        found = 1
                    }
                })
                return found;
            }
        });
        
        if (matches.length > 0)
            resp.json(matches);
        else
            resp.json({"message":"Nothing found for provided search"});
    });
};

const handleYears = app => {
    app.get('/api/painting/year/:min/:max', (req,resp) => {
        
        const matches = data.paintingsData.filter(d =>
            d.yearOfWork >= req.params.min && d.yearOfWork <= req.params.max)
        
        if (matches.length > 0)
            resp.json(matches);
        else
            resp.json({"message":"Nothing found for those years"});
    })
}

module.exports = {
    handleAPI, handleCategory, handleInPainting, handleSearch, handleYears
};
