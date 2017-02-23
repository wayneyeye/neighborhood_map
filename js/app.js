//Google map
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: sb_data.center,
		zoom: 12
	});
	for (var i =0; i < sb_data.businesses.length; i++) {
		var marker = new google.maps.Marker({
         	position: sb_data.businesses[i].cord,
          	map: map,
          	title: 'Starbucks!'
        })
	};
}

