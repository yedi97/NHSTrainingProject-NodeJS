var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var cinemaSchema = new Schema({
    tenphim: String,
    theloai: String,
    thang: String,
    nam: String,
    noidung: String,
    image_url:String
});

var Cinemas = mongoose.model('Cinemas',cinemaSchema);
module.exports = Cinemas;