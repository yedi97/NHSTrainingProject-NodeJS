var Cinemas = require("../models/cinemaModel.js");
var yearloop = new Array();
for(var i=1997;i<=2020;i++){
    yearloop.push(i);
}
var monthloop = new Array();
for(var j = 1; j <= 12; j++){
    monthloop.push(j);
}

module.exports = function(app){

    app.get("/api/setupCinemas",function(req,res){
        
        //setup seed data
        var seedCinemas = [
            {
                tenphim:"One Piece",
                theloai:[
                    "Tiểu sử lịch sử",
                    "Lãng mạng tình cảm",
                    "Khoa học viễn tưởng",
                    "Huyền bí huyền ảo",
                    "Phiêu lưu mạo hiểm",
                    "Hoạt hình",
                    "Hành động",
                    "Tâm lý",
                    "Ma, kinh dị"  
                ],
               thang:
                    monthloop
               ,
               nam:
                    yearloop
               ,
                noidung:"Câu chuyện kể về chàng trai mũ rơm luffy........",
                image_url:"http://i.imacdn.com/ta/2016/09/18/ecc7aae02c12c5b2_17fa42679d95ed04_6285914742024443143215.jpg"
            },
            {
                tenphim:"Dragon Ball",
                theloai:[
                    "Tiểu sử lịch sử",
                    "Lãng mạng tình cảm",
                    "Khoa học viễn tưởng",
                    "Huyền bí huyền ảo",
                    "Phiêu lưu mạo hiểm",
                    "Hoạt hình",
                    "Hành động",
                    "Tâm lý",
                    "Ma, kinh dị"  
                ],
                thang:
                    monthloop
                ,
                nam:
                    yearloop
                ,
                noidung:"Dragon Ball Super Zeno-sama" ,
                image_url:"http://i.imacdn.com/ta/2016/06/21/76358702a311d1ba_5ad85d27aa3a3c7e_8224914664781762143215.jpg"
            }
        ];

        Cinemas.create(seedCinemas, function(err, results){
           
            res.send(results);

        });

    });

}
