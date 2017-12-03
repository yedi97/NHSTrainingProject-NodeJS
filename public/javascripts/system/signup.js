// console.log('signup.js');

angular.module('CinemaApp').controller('signupController', ['$scope', '$firebaseArray', '$firebaseObject', "$firebaseAuth",
function($scope, $firebaseArray, $firebaseObject, $firebaseAuth) {

    // console.log('Controller Sign Up');

    $scope.username = "";
    $scope.emailSignUp = "";
    $scope.passwordSignUp = "";
    $scope.passwordConfirm = "";

    $scope.clickSignUp = function() {
        if ($scope.username.length < 3 || $scope.username.length > 25) {
            document.getElementById('username').setCustomValidity('TĂªn ngÆ°á»i dĂ¹ng tá»« 3-25 kĂ½ tá»±');
            return;
        }
        document.getElementById('username').setCustomValidity('');
        if ($scope.emailSignUp.length === 0) {
            document.getElementById('emailSignUp').setCustomValidity('Email lĂ  báº¯t buá»™c');
            return;
        }
        document.getElementById('emailSignUp').setCustomValidity('');
        if (validateEmail($scope.emailSignUp) === false) {
            document.getElementById('emailSignUp').setCustomValidity('Email khĂ´ng há»£p lá»‡');
            return;
        }
        document.getElementById('emailSignUp').setCustomValidity('');
        if ($scope.passwordSignUp.length < 7) {
            document.getElementById('passwordSignUp').setCustomValidity('Máº­t kháº©u tá»‘i thiá»ƒu 7 kĂ½ tá»±');
            return;
        }
        document.getElementById('passwordSignUp').setCustomValidity('');
        if ($scope.passwordSignUp !== $scope.passwordConfirm) {
            document.getElementById("passwordConfirm").setCustomValidity("Máº­t kháº©u khĂ´ng khá»›p");
            return;
        }
        document.getElementById("passwordConfirm").setCustomValidity('');
        solveFirebase();
    }

    var solveFirebase = function() {
        firebase.auth().createUserWithEmailAndPassword($scope.emailSignUp, $scope.passwordSignUp)
            .then(function() {
                addUserToDatabase();
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('Máº­t kháº©u quĂ¡ yáº¿u');
                } else {
                    alert(errorMessage);
                }
                return;
            });
    }

    var addUserToDatabase = function() {
        var user = firebase.auth().currentUser;
        if (user) {
            firebase.database().ref('listUsers/' + user.uid).set({
                email: user.email,
                username: $scope.username
            }).then(function() {
                window.location.href = '/';
            });
        }
    }
}
]);