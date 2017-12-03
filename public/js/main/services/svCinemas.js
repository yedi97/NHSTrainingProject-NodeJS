var app = angular.module("app.cinemas")

app.factory("svCinemas",["$http",function($http){

    return {
        get: function () {
            return $http.get("/api/cinemas");
        },
        create: function (cinemaData) {
            return $http.post("/api/cinema",cinemaData);
        },
        update: function(cinemaData){
            return $http.put("/api/cinema",cinemaData);
        },
        delete: function(id){
            return $http.delete("/api/cinema/"+id);
        }
    }

}]);