var app = angular.module('app', []);

function mainController($scope, $http, $window) {
    $scope.formData = {};
    $scope.lyriikat = "";
    $scope.lyricsnakyy = false;
    $scope.filtteri = "";
    $scope.viimeisin = "ddd";
    

    // when landing on the page, get all biisit and show them
    $http.get('/api/biisit')
        .success(function(data) {
            $scope.biisit = data;
            console.log(data);

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

   
   // Laittaa valitun biisin lyriikat näkyville.
    $scope.changeView = function(id){
        $scope.lyriikat = id;
        $scope.viimeisin = id;
        $scope.lyricsnakyy = true;
        $scope.scroll();
    };

     $scope.scroll = function () {
        $window.scrollTo(0, angular.element(document.getElementById('sanat')).offsetTop);  
        // $window.scrollTo(0, 0);  
      };

    // Piilottaa lyriikat. 
    $scope.piilota = function() {
        $scope.lyricsnakyy = false;
    }
    // $scope.addToFav = function(id){
    //     // $scope.savedSongs.push(id); 
    //     $scope.savedSongs = id;
    // }

    // Luo tietokantaan uuden biisin. 
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
    // Delete a song
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

};
