console.log("linked")
const topics = ["dogs", "zebras", "cats", "birds", "fluffy Cows"];

 // calling function to run

function createNewButton() {

  // Delete the content inside the buttons-view div prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#animal-button").empty();
  // Loop through the array of movies, then generate buttons for each movie in the array
  for (var i = 0; i < topics.length; i++) {
    var newButton = $("<button>").text(topics[i]);
    $("#animal-button").append(newButton);
  }
}
createNewButton();

    //taking user input on click cat button //call it a handler
    $("#animal-button").on("click", function() { //name it to make it read easier later function handleClick ()

      //where to pull data information
      var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&tag=cats";//read api documentation to get format

      // pulling data from website // promise
      $.ajax({ //chainging version; could also be written out var myPromise = ajax({.......})
        url: queryURL,
        method: "GET"
      })

        //function to load response from API //return of the promise
        .then(function(response) {

          //dom bit to store image for later use, specifically image_original_url
          var imageUrl = response.data.image_original_url;

          //creating image tag named catImage
          var anImage = $("<img>");

          //displaying image by nailing down attributes of the data image
          anImage.attr("src", imageUrl);
          anImage.attr("alt", "animal image");

          //adding new image above the previous
          $("#images").prepend(anImage);
        });
    });
