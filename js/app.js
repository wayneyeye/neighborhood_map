//Import Data from Yelp
var sb_data=data;
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
			position_id:sb_data.businesses[i].cord, 
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
          foursquareSearch(marker);
          // console.log(marker.position_id);
          infowindow.setContent('<h3 id="info-window">'+marker.title+'</h3>');
          infowindow.open(map, marker);
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }
//FoursquareSearch
var api_token={
	"v":'20170101',
	"ll":'',
	"client_id": 'GF0OCZ3JIRKTYFPABTPFKE2XW4LDLBVO5L2KJGC5AQALRZKE',
	"client_secret": 'L1Y1Z2Q51GSI2ZLGOM2JXZVJDCMDI5BKXHR0V2H53E1PGPWD',
	"oauth_token":'ODADXNKMBI1SYTAU4T4ZEY1GXJGPNCAHIZO0PK2A5INE402G'
};

function foursquareSearch(marker){
	//use ajax to request data from foursquare
	api_token.ll=marker.position_id.lat+','+marker.position_id.lng;
	var urlstr='https://api.foursquare.com/v2/venues/search?'+$.param(api_token);
	$.ajax({
		url:urlstr,
		dataType: "json",
		success: function(data){
			console.log(data);
		},
		error: function(e){
			console.log(e);
		}
	});

}
