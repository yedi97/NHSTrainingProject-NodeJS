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
                noidung:"Câu chuyện kể về chàng trai mũ rơm luffy........"
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
                noidung:"Dragon Ball Super Zeno-sama" 
            }
        ];

        Cinemas.create(seedCinemas, function(err, results){
           
            res.send(results);

        });

    });

}
