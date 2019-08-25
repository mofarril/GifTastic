console.log("linked")
let topics = ["dogs", "zebras", "cats", "birds", "fluffy Cows"]; //topic that interests me

////////////////////////////////////////////////////////////////////////////////////////////////////////

//BUTTONS GENNERATOR:

function createNewButton() { //creating new buttons

  $("#button-container").empty();

  // Loop through the topics array, then generate buttons for each topic in the array

  for (let i = 0; i < topics.length; i++) {

    let newButton = $("<button>"); //new button with bootstrap
    newButton.addClass("animal class=btn alert-info btn-sm"); //adding animal class
    newButton.attr("data-name", topics[i]); //adding data-attribute with value of a topic at index i
    newButton.text(topics[i]); // providing text to buttons
    $("#button-container").append(newButton);
  }
}
//Taking user input on click (the buttons created above) //call it a handler

$("#add-animal").on("click", function (event) {
  event.preventDefault();

  var newAnimal = $("#animal-input").val().trim(); //grabing text from input
  topics.push(newAnimal); //adding text to array
  createNewButton(); // creating new buttons

});

createNewButton(); //call button func

//////////////////////////////////////////////////////////////////////////////////////

//GIPHY/////

//////////ADDING GIPHY TO BUTTONS//////
$("button").on("click", function() { //listen for button click

    let animal  = $(this).attr("data-name");
  // Storing our giphy API URL for a random animal image
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KOJ4PV8ukMoaYa69HGFabyl1VGEr13uj&q=" + animal + "&limit=10&offset=0&rating=PG-13&lang=en";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

    // After the data from the AJAX request comes back
    .then(function(response) {

      console.log(queryURL);//works
      console.log(response);//works


      var results = response.data;  // Storing an array of results in the results variable

      for (var i = 0; i < results.length; i++) { //loops over result items

        var gifDiv= $("<div"); //div for gif
        var p = $('<p>').text("Rating: " + results[i].rating); //creates paragraph tag with rating
        var animalImage = $("<img>"); // Creating and storing an image tag

        //adding src attribute to property pulled from result item       
        animalImage.attr("src", results[i].response.data.images.fixed_height_small.url); 

      // appending <p> and animalImage to gifDIV

        gifDiv.append(p);
        gifDiv.append(animalImage);
      
       // Prepending the catImage to the images div
      $("#images").prepend(gifDiv);
    }
  });
})
