var Cinemas = require("../models/cinemaModel");

function getCinemas(res) {
    Cinemas.find(function (err, cinemas) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(cinemas);
        }
    });

}

module.exports = function (app) {
    // get all cinemas
    app.get("/api/cinemas", function (req, res) {
        getCinemas(res);
    });

    // /api/cinema/123

    app.get("/api/cinema/:id", function (req, res) {
        Cinemas.findById({ _id: req.params.id }, function(err, cinema){
            if(err){
                throw err;
            } else {
                res.json(cinema);
            }
        });
    });

    /**
     * Create film
     */
    app.post("/api/cinema", function(req,res){ 
         
        var cinema = {
            tenphim: req.body.tenphim,
            theloai: req.body.theloai,
            thang: req.body.thang,
            nam: req.body.nam,
            noidung: req.body.noidung,
            image_url:req.body.image_url
        };


        Cinemas.create(cinema, function(err,cinema){
            if(err){
                throw err;
            } else {
                getCinemas(res);
            }
            
        });
        
    });

    /**
     * Update film
     */
    app.put("/api/cinema", function(req,res){
        if(!req.body.id){
            res.status(500).send("ID is require");
        } else {
            Cinemas.update({
                _id:req.body.id
            },{
                tenphim: req.body.tenphim,
                theloai:req.body.theloai,
                thang: req.body.thang,
                nam: req.body.nam,
                noidung:req.body.noidung,
                image_url:req.body.image_url
            }, function(err, cinema){
                if(err){
                    return res.status(500),json(err);
                } else {
                    getCinemas(res);
                }
            });
        }
    });
    /**
     * Delete film
     */
    app.delete("/api/cinema/:id", function(req,res){
        Cinemas.remove({
            _id:req.params.id
        }, function(err, cinema){
            if(err){
                return res.status(500).json(err);
            } else {
                getCinemas(res);
            }
        });
    });
}