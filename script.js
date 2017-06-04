//TO DOS:

//create button with YouTube ID so when user clicks on download button it automatically downloads - done

//Music API information -> https://developer.musicgraph.com/

//Style front end
//Using semantic UI -> https://semantic-ui.com/introduction/getting-started.html

//Use some other kind of API

//Push information to firebase-DONE

//*****Optional:

//Display band social media information


$("#submitBtn").on("click", function(event) {

	event.preventDefault();

	//Assing input value to variable
	var searchKeyword = $("#inputValue").val().trim();
	//Concatenate string in case user adds a band name with space in between
	var finalKeyword = searchKeyword.split(" ").join("+");

	//Display Artist Name on DOM
	$("#displayArtist").empty();
	$("#videoPlayer").empty();
	$("#displayArtist").prepend(searchKeyword +"'s ");

	var newSearch = {
    name: finalKeyword};
	function writeNewPost(name, Keyword) {
  // A post entry.
	var postData = {
    name: finalKeyword
    };

  // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;

  //Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

	return firebase.database().ref().update(updates);
	}var newPostKey = firebase.database().ref().child('posts').push(newSearch.name).key;
	
	//assin API url to variable
	var queryUrl = "http://api.musicgraph.com/api/v2/track/search?api_key=6ec87e6f89ee9f0aee16c1f99c37e328&artist_name=" + finalKeyword + "&limit=10";
	
	$.ajax({
		url: queryUrl,
		method: "GET"
	}).done(function(response) {

		$("#displayTable").empty();

		//Assign input value to variable **Might not be needed here again
		var inputValue = $("#inputValue").val().trim();

		//Assign JSON band values to variables
		//Tried using for loop but did not work

		var song = [];
		var tubeId = [];
		var album = [];

		//Pull values from JSON API and add to array
		for (var i = 0; i <= 9; i++) {
			song.push(response.data[i].title);
			tubeId.push(response.data[i].track_youtube_id); 
			album.push(response.data[i].album_title);

			//Display table with values from JSON API
			$("#displayTable").append(
				"<tr><td>" + song[i] +
				"</td><td>" + album[i] +
				"</td><td class='center aligned'>" + "<a href='http://www.youtube.com/watch?v=" + tubeId[i] + "' target='_self'><input id='videoId' type='image' src='playbutton.png' width='20%'></a>" +
				"</td><td class='center aligned'>" + "<button id='downloadBtn' class='ui blue button' style='background: linear-gradient(#22abe9 5%, #010304 100%)'></button>" +
				"</td></tr>"

				);
			$("#downloadBtn").attr("id", "downloadBtn" + [i]);
			$("#videoId").attr("id", "videoId" + [i]);

			//Creates download button for each song entry
			var t = $("<a>");
	    	t.attr("href","javascript:convert2mp3('" + tubeId[i] + "')");
	    	t.css("color", "white");
	    	t.text("Download Song");
	    	$("#downloadBtn" + [i]).html(t);

	   
		};

	});



	//Pull Artist Image and Display on DOM


	// var artistUrl = "http://api.musicgraph.com/api/v2/artist/suggest?api_key=6ec87e6f89ee9f0aee16c1f99c37e328&prefix=" + finalKeyword;

	// var artistId = "";

	// $.ajax({
	// 	url: artistUrl,
	// 	method: "GET"
	// }).done(function(response) {
	// 	artistId = response.data[0].id;
		
	// });

// console.log(artistId);
	//Pull VEVO stats and Display on DOM


});

