$(document).ready(function(){
  getVideos();
  $("body").on("click", ".video-title", showVideo);
   $("body").on("click", ".delete", deleteVideo);
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
  $("<iframe class='player' type='text/html' width='640' height='390' src='http://www.youtube.com/embed/" + video.url + "' frameborder='0'></iframe>").appendTo(videoScreen);
}

function deleteVideo(){
  var toBeDeleted = $(this)
  var action = "/videos/" + $(this).data("id");
  request(action, "delete").done(function(response){
   toBeDeleted.parent().remove();
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
  $("<li class='video-title' data-id=" + video.id + "><a href='#'>" + video.title + "</a><button class='delete' href='#' data-id=" + video.id + ">delete</button></li>").appendTo("#video-list");
}