// Modal function from Materialize
    $(document).ready(function(){
        $(".modal").modal();
    });

    $(document).ready(function() {
      M.updateTextFields();
    });
    M.updateTextFields()

// Scrape website 
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

// Delete all articles 
$("#clear").on("click", function (event) {
  console.log("deleted !")
  event.preventDefault();
  $.ajax({
    type: "DELETE",
    url: "/scrape"
  }).then(function () {
    location.reload();
  })
});

// Favorite an article
$(".addFavorites").on("click", function (event) {
  console.log("You got clicked !")
  event.preventDefault();  
  let articleId = $(this).attr("data-id");
  console.log("article Id front end", articleId)
  $.ajax({
    // PUT is update !
    url: "/favorites/" + articleId,
    type: "PUT",
    data: { favorite: true }
  }).then(function () {
    // console.log("data")
    location.reload();
  }); 
});


// Dislike Article
$(".deleteFavorites").on("click", function (event) {
  // console.log("You got clicked !")
  let articleId = $(this).attr("data-id");
  // console.log("article Id front end", articleId)
  $.ajax({
    method: "PUT",
    url: "/favoritesdelete/" + articleId,
    data: { favorite: false }
    
  }).then(function () {
    window.location.reload();
  })
});

//Save Comments 
$(".saveComment").on("click", function (event) {
  event.preventDefault();
  let articleId = $(this).attr("data-id");
  let name = $("#name-" + articleId).val();
  let text = $("#text-" + articleId).val();
  // console.log(articleId, "name", name,"text", text)
  $.ajax({
    method: "POST",
    url: "/favorites/" + articleId,
    data: {
      name: name,
      text: text
    }
  }).then(function () {
    console.log("article saved")
  })
});

// delete a comment
$(".deleteNote").on("click", function(event){
  console.log("deleted !")
  let commentId = $(this).attr("data-id")
  let articleId = $(this).parent().attr("data-id");
  $.ajax({
    type: "DELETE",
    url: "/favorites/"+ articleId + "/comment/" + commentId,
    }).then(function () {
    location.reload();
  })
});



