$("#scrape").on("click", function (event) {
  console.log("scraped !")
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function (data) {
    console.log("data", data)
    window.location.reload();
  })

});

$("#clear").on("click", function (event) {
  console.log("deleted !")
  event.preventDefault();
  $.ajax({
    method: "GET",
    url: "/clear"
  }).then(function (data) {
    window.location.reload();
  })

});

// $(function () {
  // $("#scrape").on("click", function (event) {
  //   event.preventDefault();
  //   // $("#scraping-articles-modal").modal("show");
  //   $.ajax({
  //     url: "/scrape",
  //     type: "GET",
  //     success: function (result) {
  //       $("#scraping-articles-modal").modal("hide");
  //       $(".modal-body").text(result.message);
  //       $("#articles-scraped-modal").modal("show");
  //     },
      // error: function () {
        // $("#scraping-articles-modal").modal("hide");
        // $(".modal-body").text("Could not scrape at this time");
        // $("#articles-scraped-modal").modal("show");
      // }
  //   });
  // });
// Save the articles 
// @ts-ignore
// $(document).on("click", ".saveNote", function () {
//   console.log("You got clicked !")
//   $.ajax({
//     method: "PUT",
//     // PUT is update !
//     // @ts-ignore
//     url: "/save/" + $(this).attr("id")
//   }).then(function (data) {
//     console.log("data", data)
//     window.location.reload();
//   })
// });

// // Add a note 

//   $(document).on("click", ".saveNote", function () {
//     console.log("You got clicked !")

//     event.preventDefault();
//     // @ts-ignore
//     var thisId = $(this).attr("data-id");
//     console.log(thisId)
//     var modalNote = $(".modalNote").text();
//     console.log(modalNote);
//     // @ts-ignore
//     $.ajax({
//       method: "GET",
//       url: "/article/" + thisId
//       // Talk to new route I make to grab a single article
//     }).then(function (data) {
//       console.log("data", data)
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     });
//   })
// // });

// // Save Note
// $(document).on("click", "#savenote", function () {
//   // @ts-ignore
//   var thisId = $(this).attr("data-id");

//   // @ts-ignore
//   $.ajax({
//     method: "POST",
//     url: "/note/" + thisId,
//     data: {
//       // @ts-ignore
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       // @ts-ignore
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function (data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       // @ts-ignore
//       $("#notes").empty();
//     });

//   // Also, remove the values entered in the input and textarea for note entry
//   // @ts-ignore
//   $("#titleinput").val("");
//   // @ts-ignore
//   $("#bodyinput").val("");
// });


// // On click index to save the note
// Id of the article this.id 


    // // Empty the notes from the note section
  // $("#notes").empty();
  // // Save the id from the p tag
//   var thisId = $(this).attr("data-id");

//   // Now make an ajax call for the Article
//   $.ajax({
//     method: "GET",
//     url: "/articles/" + $(this).attr("data-id")
//     // With that done, add the note information to the page
//     .then(function(data) {
//       console.log(data);
//       // The title of the article
//       $("#notes").append("<h2>" + data.title + "</h2>");
//       // An input to enter a new title
//       $("#notes").append("<input id='titleinput' name='title' >");
//       // A textarea to add a new note body
//       $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//       // A button to submit a new note, with the id of the article saved to it
//       $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//       // If there's a note in the article
//       if (data.note) {
//         // Place the title of the note in the title input
//         $("#titleinput").val(data.note.title);
//         // Place the body of the note in the body textarea
//         $("#bodyinput").val(data.note.body);
//       }
//     })
// });

// // When you click the savenote button
// $(document).on("click", "#savenote", function() {
//   // Grab the id associated with the article from the submit button
//   var thisId = $(this).attr("data-id");

//   // Run a POST request to change the note, using what's entered in the inputs
//   $.ajax({
//     method: "POST",
//     url: "/articles/" + thisId,
//     data: {
//       // Value taken from title input
//       title: $("#titleinput").val(),
//       // Value taken from note textarea
//       body: $("#bodyinput").val()
//     }
//   })
//     // With that done
//     .then(function(data) {
//       // Log the response
//       console.log(data);
//       // Empty the notes section
//       $("#notes").empty();
//     });


  // Also, remove the values entered in the input and textarea for note entry
  // $("#titleinput").val("");
  // $("#bodyinput").val("");

// });

