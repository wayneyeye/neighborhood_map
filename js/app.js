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
	var largeInfowindow = new google.maps.InfoWindow();
	for (var i =0; i < sb_data.businesses.length; i++) {
		var marker = new google.maps.Marker({
         	position: sb_data.businesses[i].cord,
          	map: map,
          	animation: google.maps.Animation.DROP,
          	icon: image,
          	title: 'Starbucks!',
          	id: sb_data.businesses[i].id
        })
        marker.addListener('click', toggleBounce);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
        markers.push(marker);
        bounds.extend(markers[i].position);
	};
	map.fitBounds(bounds);
}

//Toggle Bouncing animation
function toggleBounce() {
  var self=this;
  if (self.getAnimation() !== null) {
    self.setAnimation(null);
  } else {
    self.setAnimation(google.maps.Animation.BOUNCE);
    //stops after 5000ms or by a click
    setTimeout(function(){self.setAnimation(null);},5000);
  }
}

//Infowindow
function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          // console.log(marker.title);
          infowindow.setContent('<h3 id="info-window">'+marker.title+'</h3>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }