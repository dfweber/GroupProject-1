
$("#enterArtist").on("click", function(event) {

        event.preventDefault();
 
        var artist = $("#artistInput").val();
 		    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&order=viewCount&q=" + artist + "&type=video&key=AIzaSyCFoyJ6giAFWoS3L2ktA6cCeqUPoVaBJS0";
       
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        console.log(response);

        $("#songTable").empty();

        // Change the HTML
        $("#tableHeader").html(
        "<tr><th> " + "Artist Searched" + 
        "</th><th> " + "Video or Song Name" + 
        "</th><th> " + "Click Button to Download" + 
        "</th></tr><br>");


	    $("#songTable").append(JSON.stringify(
	    "<tr><td> " + artist + 
	    "</td><td> " + response.items[0].snippet.title + 
	    "</td><td><button id='downloadBtn0'></button></td></tr><br>" +
 
        "<tr><td> " + artist + 
        "</td><td> " + response.items[1].snippet.title + 
        "</td><td><button id='downloadBtn1'></button></td></tr><br>" +

        "<tr><td> " + artist + 
        "</td><td> " + response.items[2].snippet.title + 
        "</td><td><button id='downloadBtn2'></button></td></tr><br>"

        ));

	  

        //testing button out - is working
        var t = $("<a>");
        t.addClass("c2m3");
        t.attr("href","javascript:convert2mp3('" + response.items[0].id.videoId + "')");
        t.text("Download Song");
        $("#downloadBtn0").append(t);

        var t = $("<a>");
        t.addClass("c2m3");
        t.attr("href","javascript:convert2mp3('" + response.items[1].id.videoId + "')");
        t.text("Download Song");
        $("#downloadBtn1").append(t);

        var t = $("<a>");
        t.addClass("c2m3");
        t.attr("href","javascript:convert2mp3('" + response.items[2].id.videoId + "')");
        t.text("Download Song");
        $("#downloadBtn2").append(t);

        });     

});


   
  
