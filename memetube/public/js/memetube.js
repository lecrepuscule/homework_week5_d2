$(document).ready(function(){
  console.log("hello");
  getVideos();
})

function getVideos(){
  request("/videos", "get", null).done(function(response){
    $.each(response, function(index, video){
      appendVideo(video);
    })
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