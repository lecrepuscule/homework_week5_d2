$(document).ready(function(){
  getVideos();
})

function getVideos(){
  request("/videos", "get", null).done(funciton(response){
    console.log(response);
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