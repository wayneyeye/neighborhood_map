//Google map
var map;
var markers=[];
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: sb_data.center,
		zoom: 12
	});
	var image = 'img/marker.png';
	var bounds = new google.maps.LatLngBounds();
	for (var i =0; i < sb_data.businesses.length; i++) {
		var marker = new google.maps.Marker({
         	position: sb_data.businesses[i].cord,
          	map: map,
          	animation: google.maps.Animation.DROP,
          	icon: image,
          	title: 'Starbucks!',
          	id: sb_data.businesses[i].id
        })
        markers.push(marker);
        bounds.extend(markers[i].position);
	};
	map.fitBounds(bounds);
}

