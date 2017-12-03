// console.log('changePassword.js');

angular.module('CinemaApp').controller("changePasswordController", ['$scope', '$firebaseArray', '$firebaseObject', '$firebaseAuth',

    function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

        // console.log('changePassword Controller');

        $scope.passwordCurrent = '';
        $scope.passwordNew = '';
        $scope.passwordNewConfirm = '';

        $scope.clickChangePassword = function() {
            if ($scope.passwordCurrent.length === 0) {
                document.getElementById('passwordCurrent').setCustomValidity('Máº­t kháº©u lĂ  yĂªu cáº§u');
                return;
            }
            document.getElementById('passwordCurrent').setCustomValidity('');
            if ($scope.passwordNew.length < 7) {
                document.getElementById('passwordNew').setCustomValidity('Máº­t kháº©u tá»‘i thiá»ƒu 7 kĂ½ tá»±');
                return;
            }
            document.getElementById('passwordNew').setCustomValidity('');
            if ($scope.passwordNew !== $scope.passwordNewConfirm) {
                document.getElementById('passwordNewConfirm').setCustomValidity('Máº­t kháº©u khĂ´ng khá»›p');
                return;
            }
            document.getElementById('passwordNewConfirm').setCustomValidity('');

            solveFirebase();
        }

        var solveFirebase = function() {
            var user = firebase.auth().currentUser;

            var credential = firebase.auth.EmailAuthProvider.credential(
                user.email,
                $scope.passwordCurrent
            );

            user.reauthenticateWithCredential(credential).then(function() {
                // User re-authenticated.
                // console.log('auth ok');
                updatePassword();
            }).catch(function(error) {
                // An error happened.
                // console.log(error);
                alert('Máº­t kháº©u khĂ´ng Ä‘Ăºng hoáº·c ngÆ°á»i dĂ¹ng chÆ°a cĂ³ máº­t kháº©u xĂ¡c thá»±c!');
            });
        }

        var updatePassword = function() {
            firebase.auth().currentUser.updatePassword($scope.passwordNew).then(function() {
                // Update successful.
                alert('Máº­t kháº©u thay Ä‘á»•i thĂ nh cĂ´ng!');
                window.location.reload();
            }).catch(function(error) {
                // An error happened.
                // console.log('Loi cap nhat' + error);
                alert('Máº­t kháº©u khĂ´ng thay Ä‘á»•i! Vui lĂ²ng thá»­ láº¡i!')
            });
        }
    }
]);