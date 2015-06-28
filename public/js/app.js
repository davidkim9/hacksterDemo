var lat = 32.7268545;
var lon = -117.192585;
var zoom = 14;
var map;

var coordinate = new google.maps.LatLng(lat, lon);

//Map Related
var marker = new google.maps.Marker({
  content: "asdf",
  position: coordinate
});

var loadGoogleMaps = function (){
	var myOptions = {
		center: coordinate,
		zoom: zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map($("#map")[0], myOptions);
}

var updateMapCenter = function(){
	map.setCenter(coordinate);
}

function loadGPSData(){
	$.get( "/gps", function( data ) {
		lat = data.lat;
		lon = data.lon;
		coordinate = new google.maps.LatLng(lat, lon);

		//Remove old marker
		if(marker)
			marker.setMap(null);
		marker = new google.maps.Marker({
		  content: "asdf",
		  position: coordinate
		});
		marker.setMap(map);
		updateMapCenter();

		$(".gLink").attr('href', 'https://www.google.com/maps?q=' + lat + ',' + lon);
	});
}

loadGoogleMaps();

setInterval(loadGPSData, 5000);
loadGPSData();