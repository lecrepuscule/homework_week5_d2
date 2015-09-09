$(document).ready(function(){
  getVideos();
  $("body").on("click", ".video-title", showVideo);
  $("body").on("click", ".delete", deleteVideo);
  $("body").on("click", ".edit", editVideo);
  $("#new-submit").on("click", createVideo);
})

function getVideos(){
  request("/videos", "get", null).done(function(response){
    $.each(response, function(index, video){
      appendVideo(video);
    })
  })
}

function showVideo(){
  var action = "/videos/" + $(this).data("id");
  request(action, "get").done(function(response){
    screenVideo(response);
  })
}

function screenVideo(video){
  var videoScreen = $("#video-screen");
  videoScreen.empty();
  $("<iframe class='screen-player' type='text/html' width='640' height='390' src='http://www.youtube.com/embed/" + video.url + "' frameborder='0' data-id=" + video.id + "></iframe>").appendTo(videoScreen);
}

function deleteVideo(){
  var toBeDeleted = $(this)
  var action = "/videos/" + $(this).data("id");
  request(action, "delete").done(function(response){
    var screenPlayer = $(".screen-player");
    if (screenPlayer.data("id") === toBeDeleted.data("id")) {
      screenPlayer.empty();
    }
    toBeDeleted.parent().remove();
  })
}

function createVideo(){
  var data = {
    title: $("#title-input").val(),
    description: $("#description-input").val(),
    url: $("#url-input").val(),
    genre: $("#genre-input").val()
  }
  request("/videos", "post", data).done(function(response){
    appendVideo(response)
  })
}


function editVideo(){
  var toBeUpdated = $(this)
  var action = "/videos/" + $(this).data("id");
  var data = {
    title: $("#title-input").val(),
    description: $("#description-input").val(),
    url: $("#url-input").val(),
    genre: $("#genre-input").val()
  }
  request(action, "post", data).done(function(response){
    toBeUpdated.parent().remove()
    appendVideo(response)
  })
}

function request(action, method, data){
  return $.ajax({
    url: action,
    method: method,
    dataType: "json",
    data: data
  })
}

function appendVideo(video){
  $("<li class='video-title' data-id=" + video.id + "><a href='#'>" + video.title + "</a><button class='Edit' href='#' data-id=" + video.id + ">Edit</button><button class='delete' href='#' data-id=" + video.id + ">delete</button></li>").appendTo("#video-list");
}