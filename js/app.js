//Google map
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: sb_data.center.latitude,
			lng: sb_data.center.longitude
		},
		zoom: 12
	});
}

