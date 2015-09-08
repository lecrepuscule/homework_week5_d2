$(document).ready(function(){
  getVideos();
  $("body").on("click", ".video-title", showVideo);
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
    console.log(response);
    playVideo();
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
  $("<li class='video-title' data-id=" + video.id + "><a href='#'>" + video.title + "</a></li>").appendTo("#video-list");
}