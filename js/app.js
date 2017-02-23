//Google map
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 32.970027,
			lng: -96.725517
		},
		zoom: 13
	});
}