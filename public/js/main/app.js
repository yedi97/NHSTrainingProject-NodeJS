//[] danh sách các model khác của angular sẽ sử dụng trong dự án
var app = angular.module("app.cinemas",["xeditable"]);
/* Tham số thứ nhất: tên controller, tham số thứ hai: danh sách service('$scope') của angular
* Tham số cuối cùng trong mảng là function
*/
var yearloop = new Array();
for(var i=1997;i<=2020;i++){
    yearloop.push(i);
}
var monthloop = new Array();
for(var j = 1; j <= 12; j++){
    monthloop.push(j);
}
app.controller("cinemaController", ['$scope','svCinemas',function($scope, svCinemas){
    //định nghĩa model (model - view - star)
    $scope.appName = "Cinema Box";
    $scope.thang= monthloop;
    $scope.nam = yearloop;
    $scope.theloai = [
        "Tiểu sử lịch sử",
        "Lãng mạng tình cảm",
        "Khoa học viễn tưởng",
        "Huyền bí huyền ảo",
        "Phiêu lưu mạo hiểm",
        "Hoạt hình",
        "Hành động",
        "Tâm lý",
        "Ma, kinh dị"
    ]
    //load data from api
    svCinemas.get()
    .then(function(res){
        $scope.cinemas = res.data;
        console.log(res);
        $scope.loading = false; 
    });

    $scope.createCinema = function(){ 
        $scope.loading = true;
        var cinema = {
            tenphim: $scope.formData.tenphim,
            theloai:$scope.formData.theloai,
            thang:$scope.formData.thang,
            nam:$scope.formData.nam,
            noidung:$scope.formData.noidung,
            image_url:$scope.formData.image_url,
        }
       svCinemas.create(cinema)
       .then(function(res){ 
           $scope.cinemas = res.data;
           $scope.formData.tenphim="";
           $scope.formData.theloai=[];
           $scope.formData.thang=[];
           $scope.formData.nam=[];
           $scope.formData.noidung="";
           $scope.formData.image_url="";
           $scope.loading = false; 
            
       }); 
       window.location.href = '/';
    }

    $scope.updateCinema = function(cinema){
        console.log("Update cinema: ",cinema);
        $scope.loading = true;

        svCinemas.update(cinema)
        .then(function(res){
            $scope.cinemas = res.data;
            $scope.loading = false;
        });
    }

    $scope.deleteCinema = function(cinema){
        console.log("Delete cinema:",cinema);
        $scope.loading = true;
        svCinemas.delete(cinema._id)
        .then(function(res){
            $scope.cinemas = res.data;
            $scope.loading = false;
        });
    }
}]);
