// console.log("js is here");

$(document).ready(function(){

  $("#put-form").on("submit", function(event){
    event.preventDefault();
    var articleForm = $(this);
    var articleURL = articleForm.attr("action");
    var articleData = articleForm.serialize();
    $.ajax({
      method: "PUT",
      url: articleURL,
      data: articleData
    }).done(function(data){
      console.log(data);
      // update the client side
    });
  });

  $(".delete-link").on("click", function(event){
    event.preventDefault();
    var articleElement = $(this);
    var articleURL = articleElement.attr("href");
    $.ajax({
      method: "DELETE",
      url: articleURL
    }).done(function(data){
      console.log(data);
      // remove article from client side
      window.location = "/articles";
    });
  });

});
