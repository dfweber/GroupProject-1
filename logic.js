
$("#enterArtist").on("click", function(event) {

        event.preventDefault();
 
        var artist = $("#artistInput").val();
 		    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=viewCount&q=" + artist + "&type=video&key=AIzaSyCFoyJ6giAFWoS3L2ktA6cCeqUPoVaBJS0";
       
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        console.log(response);

        // $("#displaySongs").append(JSON.stringify("<h2>" + response.items[0].id.videoId + "</h2>"));

        // Change the HTML
        $("#tableHeader").html(
        "<tr><th> " + "Artist Searched" + 
        "</th><th> " + "Video or Song Name" + 
        "</th><th> " + "Video Id" + //showing as button for now - need to work on this
        "</th></tr><br>");

        $("#songTable").append(JSON.stringify(
        "<tr><td> " + artist + 
        "</td><td> " + response.items[0].snippet.title + 
        "</td><td><button>" + response.items[0].id.videoId +
        "</button></td></tr><br>" +

        "<tr><td> " + artist + 
        "</td><td> " + response.items[1].snippet.title + 
        "</td><td><button>" + response.items[1].id.videoId +
        "</button></td></tr><br>" +

        "<tr><td> " + artist + 
        "</td><td> " + response.items[2].snippet.title + 
        "</td><td><button>" + response.items[2].id.videoId +
        "</button></td></tr><br>"

        ));

        //testing button out - not working
        var t = $("<button><a>");
        t.addClass("c2m3");
        t.attr("href","javascript:convert2mp3('" + response.items[0].id.videoId + "')");
        t.text("Download Song");
        $("#btnTest").append(t);

        var t = $("<button><a>");
        t.addClass("c2m3");
        t.attr("href","javascript:convert2mp3('" + response.items[1].id.videoId + "')");
        t.text("Download Song");
        $("#btnTest").append(t);

        var t = $("<button><a>");
        t.addClass("c2m3");
        t.attr("href","javascript:convert2mp3('" + response.items[2].id.videoId + "')");
        t.text("Download Song");
        $("#btnTest").append(t);



        });      

});


   
  
