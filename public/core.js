var scotchBiisi = angular.module('scotchBiisi', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $scope.lyriikat = "";
    $scope.lyricsnakyy = false;
    $scope.filtteri = "";
    

    // when landing on the page, get all biisit and show them
    $http.get('/api/biisit')
        .success(function(data) {
            $scope.biisit = data;
            console.log(data);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.changeView = function(id){
        
        $scope.lyriikat = id;
        $scope.lyricsnakyy = true;


    };

    $scope.piilota = function() {
        $scope.lyricsnakyy = false;
    }

    $scope.filterSongs = function(){

    }

    $scope.createBiisi = function() {


        $http.post('/api/biisit', $scope.formData)
               .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.biisit = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a Biisi after checking it
    $scope.deleteBiisi = function(id) {
        $http.delete('/api/biisit/' + id)
            .success(function(data) {
                $scope.biisit = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
