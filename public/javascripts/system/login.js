// console.log('login.js');

var lastUserEmail = null;
var lastUserPassword = null;
var lastUserRemember = false;

angular.module('CinemaApp').controller('loginController', ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',
    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('Controller Login');

        $scope.emailLogin = "";
        $scope.passwordLogin = "";
        $scope.rememberPassword = false;

        console.log(lastUserRemember);
        if (lastUserRemember) {
            $scope.emailLogin = lastUserEmail;
            $scope.passwordLogin = lastUserPassword;
        }

        $scope.clickLogin = function() {
            if ($scope.emailLogin.length === 0) {
                document.getElementById('emailLogin').setCustomValidity('Email lĂ  báº¯t buá»™c');
                return;
            }
            document.getElementById('emailLogin').setCustomValidity('');
            if (validateEmail($scope.emailLogin) === false) {
                document.getElementById('emailLogin').setCustomValidity('Email khĂ´ng há»£p lá»‡');
                return;
            }
            document.getElementById('emailLogin').setCustomValidity('');
            if ($scope.passwordLogin.length === 0) {
                document.getElementById('passwordLogin').setCustomValidity('Máº­t kháº©u lĂ  yĂªu cáº§u');
                return;
            }
            document.getElementById('passwordLogin').setCustomValidity('');
            solveFirebase();
        }

        solveFirebase = function() {
            firebase.auth().signInWithEmailAndPassword($scope.emailLogin, $scope.passwordLogin)
                .then(function() {
                    // console.log($scope.rememberPassword);
                    if ($scope.rememberPassword) {
                        lastUserEmail = $scope.emailLogin;
                        lastUserPassword = $scope.passwordLogin;
                    }
                    lastUserRemember = $scope.rememberPassword;
                    window.location.reload(true);
                }).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Sai máº­t kháº©u');
                    } else {
                        alert('Email nĂ y chÆ°a Ä‘Æ°á»£c Ä‘Äƒng kĂ½ hoáº·c Ä‘Ă£ bá»‹ xĂ³a');
                    }
                });
        }
    }
]);