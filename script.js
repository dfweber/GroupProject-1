//TO DOS:

//create button with YouTube ID so when user clicks on download button it automatically downloads - done

//Music API information -> https://developer.musicgraph.com/

//Style front end
//Using semantic UI -> https://semantic-ui.com/introduction/getting-started.html

//Use some other kind of API

//Push information to firebase-DONE

//*****Optional:

//Display band social media information


var database = firebase.database();

var searchKeyword = "";
var finalKeyword = "";

$("#submitBtn").on("click", function(event) {

	event.preventDefault();

	//Assign input value to variable
	searchKeyword = $("#inputValue").val().trim();
	//Concatenate string in case user adds a band name with space in between
	finalKeyword = searchKeyword.split(" ").join("+");

	//Display Artist Name on DOM
	$("#displayArtist").empty();
	$("#videoPlayer").empty();
	$("#displayArtist").prepend(searchKeyword +"'s ");

	//assin API url to variable
	var queryUrl = "http://api.musicgraph.com/api/v2/track/search?api_key=6ec87e6f89ee9f0aee16c1f99c37e328&artist_name=" + finalKeyword + "&limit=3";
	
	$.ajax({
		url: queryUrl,
		method: "GET"
	}).done(function(response) {

		$("#displayTable").empty();

		var song = [];
		var tubeId = [];
		var album = [];

		//Pull values from JSON API and add to array
		for (var i = 0; i <= 2; i++) {
			song.push(response.data[i].title);
			tubeId.push(response.data[i].track_youtube_id); 
			album.push(response.data[i].album_title);

			//Display table with values from JSON API
			$("#displayTable").append(
				"<tr><td>" + song[i] +
				"</td><td>" + album[i] +
				// "</td><td class='center aligned'>" + "<a href='http://www.youtube.com/watch?v=" + tubeId[i] + "' target='_blank'><input id='videoId' type='image' src='playbutton.png' width='20%'></a>" +
				"</td><td class='center aligned'>" + "<a href='http://www.youtube.com/watch?v=" + tubeId[i] + "?autoplay=1&showinfo=0&controls=0' frameborder='0' target='_blank' class='js-newWindow' data-popup='toolbar=no,scrollbars=yes,resizable=yes,top=70,left=400,width=440,height=300'><input id='videoId' type='image' src='playbutton.png' width='20%'></a>" +
				"</td><td class='center aligned'>" + "<button id='downloadBtn' class='ui blue button' style='background: linear-gradient(#22abe9 5%, #010304 100%)'></button>" +
				"</td></tr>"
				);
			
			$("#downloadBtn").attr("id", "downloadBtn" + [i]);
			$("#videoId").attr("id", "videoId" + [i]);

			//popup code
			$(document).ready(function(){
            $('.js-newWindow').click(function () {
                // event.preventDefault();
 
                var $this = $(this);
 
                var url = $this.attr("href");
                var windowName = "popUp";
                var windowSize = $this.data("popup");
 
                window.open(url, windowName, windowSize);
            	});
        	});

			//Creates download button for each song entry
			var t = $("<a>");
	    	t.attr("href","javascript:convert2mp3('" + tubeId[i] + "')");
	    	t.css("color", "white");
	    	t.text("Download Song");
	    	$("#downloadBtn" + [i]).html(t);

			//firebase code
			var songTitle = song[i];
			
			 $("#downloadBtn" + [i]).on("click", function() {
			  	
			 		database.ref().push({
					searchKeyword: searchKeyword,
					songTitle: songTitle, 
					dateAdded: firebase.database.ServerValue.TIMESTAMP
					});	

			 	database.ref().orderByChild("songTitle").on("child_added", function(snapshot) {

			 		$("#histLog").append(
			 	    "<tr><td> " + snapshot.val().searchKeyword + 
			 	    "</td><td> " + snapshot.val().songTitle +
			 	    "</td><td> " + (moment(snapshot.val().dateAdded).format("MM/DD/YY hh:mm A")) +
			 	    "</td></tr><br>"
	 	 			);

			 	}, function(errorObject) {
			 		console.log("the read failed: " + errorObject.code);
			 	});
				
			});
		};
	
	});


});

