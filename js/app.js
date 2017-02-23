//Import Data from Yelp
var sb_data = JSON.parse(data);
console.log(sb_data);
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