console.log("linked")

$(document).ready(function () {
  let topics = ["dogs", "zebras", "cats", "birds", "fluffy Cows"]; //topic that interests me

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  //BUTTONS GENNERATOR:

  function createNewButton() { //creating new buttons

    $("#button-container").empty();

    // Loop through the topics array, then generate buttons for each topic in the array

    for (let i = 0; i < topics.length; i++) {

      let newButton = $("<button>"); //new button 
      newButton.addClass("animal class=btn alert-info btn-sm"); //adding animal class w/bootstrap
      newButton.attr("data-name", topics[i]); //adding data-attribute with value of a topic at index i
      newButton.text(topics[i]); // providing text to buttons
      $("#button-container").append(newButton);
    }
  }
  //Taking user input on click (the buttons created above) //call it a handler

  $("#add-animal").on("click", function (event) {
    event.preventDefault();

    let newAnimal = $("#animal-input").val().trim(); //grabing text from input
    topics.push(newAnimal); //adding text to array
    createNewButton(); // creating new buttons

  });

  createNewButton(); //call button func //works 

  //////////////////////////////////////////////////////////////////////////////////////

  //GIPHY/////

  //////////ADDING GIPHY TO BUTTONS/////////////////////////////////////////////////////

  $("button").on("click", function () { // listen for button click //

    let animal = $(this).attr("data-name");

    // Storing our giphy API URL for a random animal image //

    let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KOJ4PV8ukMoaYa69HGFabyl1VGEr13uj&q=" + animal + "&limit=10&offset=0&rating=PG-13&lang=en";

    // Perfoming an AJAX GET request to our queryURL //

    $.ajax({
      url: queryURL,
      method: "GET"
    })

      // After the data from the AJAX request comes back //

      .then(function (response) {

        console.log(queryURL);//works
        console.log(response);//works

        // Storing an array of results in the results variable //

        let results = response.data;

        // loops over result items //

        for (let i = 0; i < results.length; i++) {

          let gifDiv = $("<div>"); // div for gif
          //let rating = results[i].rating; // creating rating variable DO I NEED THIS? no
          let p = $('<p>').text("Rating: " + results[i].rating); // creates paragraph tag with rating
          let animalImage = $("<img>"); // Creating and storing an image tag

          // creating fixed and still variables to pause/unpause gifs

          let animate = results[i].images.fixed_height_small.url;
          let still = results[i].images.fixed_height_small_still.url;


          // adding src attribute to property pulled from result item to pause/unpause      
          animalImage.addClass("gif");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("src", animate);
          animalImage.attr("data-animate", animate); // not working, but in console // works

          animalImage.attr("data-state", "still");

          // appending <p> and animalImage to gifDIV

          gifDiv.append(p);
          gifDiv.append(animalImage);

          // add class from buttons generated to new buttons

          gifDiv.addClass("animalsG");

          // Prepending the animalImage to the images div

          $("#images").prepend(gifDiv);

        } //close for loop

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////ANIMATE GIFs////////////////////////////////////////////////////////////  

        $(".gif").on("click", function () {

          let state = $(this).attr("data-state");

          // If the clicked image's state is still, update its src attribute to what its data-animate value is.

          if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate"); // Then, set the image's data-state to animate

          } else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still"); // Else set src to the data-still value
          }
        });
      });
  });
})
