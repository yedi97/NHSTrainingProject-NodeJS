// console.log('creat.js film');

angular.module('CinemaApp').controller('createController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

    // console.log('Controller Create Film');

    $scope.completeLoading = false;
    // hideBeforeLoadingComplete();
    showLoader();

    $scope.listGenreFilms = [
        'Tiá»ƒu sá»­ lá»‹ch sá»­',
        'LĂ£ng máº¡n tĂ¬nh cáº£m',
        'Khoa há»c viá»…n tÆ°á»Ÿng',
        'Huyá»n bĂ­ huyá»n áº£o',
        'PhiĂªu lÆ°u máº¡o hiá»ƒm',
        'PhĂ¡p luáº­t hĂ¬nh sá»±',
        'Chiáº¿n tranh cá»• trang',
        'Chiáº¿n tranh trung Ä‘áº¡i',
        'Chiáº¿n tranh hiá»‡n Ä‘áº¡i',
        'Kiáº¿m hiá»‡p, cá»• trang',
        'Thuyáº¿t minh',
        'Hoáº¡t hĂ¬nh',
        'Ma, kinh dá»‹',
        'Ká»‹ch tĂ­nh',
        'HĂ nh Ä‘á»™ng',
        'SĂ¡t nhĂ¢n',
        'Thá»ƒ thao',
        'VĂµ thuáº­t',
        'TĂ¢m lĂ½',
        'Tá»™i Ă¡c',
    ];

    $scope.listMonth = [];
    for (var i = 1; i <= 12; i++) $scope.listMonth.push('ThĂ¡ng ' + i);
    $scope.listYear = [];
    for (var i = 1900; i <= 2050; i++) $scope.listYear.push('NÄƒm ' + i);

    $scope.filmMonth = 'ThĂ¡ng ' + (new Date().getMonth() + 1);
    $scope.filmYear = 'NÄƒm ' + new Date().getFullYear();

    // console.log($scope.filmMonth, $scope.filmYear);
    // var month = $scope.filmMonth.substr(6, $scope.filmMonth.length - 6);
    // if (month.length == 1) month = '0' + month;
    // console.log('_' + month + '_');

    $scope.filmName = "";
    $scope.filmGenre = $scope.listGenreFilms[0];
    $scope.filmContent = "";
    var filmUrl = "";
    var filePicked = null;

    $('.loader').fadeOut(500, function() {
        $scope.completeLoading = true;
        $scope.$apply();
        showAfterLoadingComplete();
    })

    document.getElementById('fileInput').addEventListener('change', function(e) {
        filePicked = e.target.files[0];
        // console.log('change image');
        $('#imageFilm').css('opacity', 1);
    }, false);

    $scope.clickUploadImage = function() {
        document.getElementById('fileInput').click();
    }

    $scope.clickUploadFilm = function() {
        if ($scope.filmName.length < 5 || $scope.filmName.length > 50) {
            document.getElementById('filmName').setCustomValidity('TĂªn bá»™ phim tá»« 5-50 kĂ½ tá»±');
            return;
        }
        document.getElementById('filmName').setCustomValidity('');
        if ($scope.filmContent.length < 10) {
            document.getElementById('filmContent').setCustomValidity('MĂ´ táº£ bá»™ phim tá»‘i thiá»ƒu 10 kĂ½ tá»±');
            return;
        }
        document.getElementById('filmContent').setCustomValidity('');

        if (filePicked === null) {
            alert('Báº¡n chÆ°a chá»n áº£nh minh há»a phim');
            return;
        }
        solveFirebase();
    }

    function solveFirebase() {
        showLoader();
        var time = new Date().getTime();
        var storageRef = firebase.storage().ref('imagess/IMG' + time + '.JPG');
        var metadata = {
            contentType: 'image/JPG'
        };
        storageRef.put(filePicked, metadata)
            .then(function(snapshot) {
                filmUrl = snapshot.downloadURL;
                // console.log(filmUrl);
                uploadFilmOnFirebase();
            })
            .catch(function(error) {
                // console.error('Upload failed:', error);
                $('.loader').fadeOut(500, function() {
                    alert('Lá»—i trong quĂ¡ trĂ¬nh táº£i áº£nh lĂªn');
                })
            });
    }

    function uploadFilmOnFirebase() {
        var ref = firebase.database().ref('listFilms');
        var newKey = ref.push().key;
        var month = $scope.filmMonth.substr(6, $scope.filmMonth.length - 6);
        if (month.length == 1) month = '0' + month;
        var year = $scope.filmYear.substr(4, $scope.filmYear.length - 4);
        var newFilm = {
            name: $scope.filmName,
            content: $scope.filmContent,
            month: month,
            year: year,
            time: month + '-' + year,
            genre: $scope.filmGenre,
            url: filmUrl,
            key: newKey
        }
        ref.child(newKey).set(newFilm).then(function() {
            $('.loader').fadeOut(500, function() {
                alert('Phim Ä‘Ă£ táº£i lĂªn thĂ nh cĂ´ng');
                window.location.href = '/';
            })
        });
    }
}
]);



$("#fileInput").change(function() {
readURL(this);
});

function readURL(input) {
if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $('#imageFilm').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
}
}