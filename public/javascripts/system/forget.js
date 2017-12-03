// console.log('forget.js');

angular.module('CinemaApp').controller('forgetController', ['$scope',
function($scope) {

    // console.log('Controller Forget');

    $scope.emailRecover = "";

    $scope.clickRecover = function() {
        if ($scope.emailRecover.length === 0) {
            document.getElementById('emailRecover').setCustomValidity('Email lĂ  báº¯t buá»™c');
            return;
        }
        document.getElementById('emailRecover').setCustomValidity('');
        if (validateEmail($scope.emailRecover) === false) {
            document.getElementById('emailRecover').setCustomValidity('Email khĂ´ng há»£p lá»‡');
            return;
        }
        document.getElementById('emailRecover').setCustomValidity('');
        solveFirebase();
    }

    var solveFirebase = function() {
        firebase.auth().sendPasswordResetEmail($scope.emailRecover)
            .then(function() {
                alert('Email khĂ´i phá»¥c máº­t kháº©u Ä‘Ă£ Ä‘Æ°á»£c gá»­i!');
                window.location.reload();
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/invalid-email') {
                    alert('Email khĂ´ng há»£p lá»‡');
                } else if (errorCode == 'auth/user-not-found') {
                    alert('Email nĂ y chÆ°a Ä‘Æ°á»£c Ä‘Äƒng kĂ½ hoáº·c Ä‘Ă£ bá»‹ xĂ³a');
                }
            });
    }
}
]);