//Import Data from Yelp
var sb_data=data;
//Init Google map with error handling
var timer=setTimeout(function(){
	document.getElementById('map').style.padding=0;
	document.getElementById('map').innerHTML='<h2 id="map-error">Error occurs when loading Google Map</h2>'+'<img id="bad-connection" src="img/sad.jpg">';
},5000);//The DOM will display a warning text after 5000ms
//Google map
var map;
var markers=[];
var infowindow;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: sb_data.center,
		zoom: 12
	});
	var image = 'img/marker.png';
	var bounds = new google.maps.LatLngBounds();
	var largeInfowindow = new google.maps.InfoWindow();
	infowindow=largeInfowindow;
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
	clearTimeout(timer);//clears the timer once loaded
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
displayStr='';
function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          foursquareSearch(marker,infowindow);
          // console.log(displayStr);
          // infowindow.setContent(displayStr);
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

function foursquareSearch(marker,infowindow){
	//use ajax to request data from foursquare
	api_token.ll=marker.position_id.lat+','+marker.position_id.lng;
	var urlstr='https://api.foursquare.com/v2/venues/search?'+$.param(api_token);
	$.ajax({
		url:urlstr,
		dataType: "json",
		success: function(data){
			// console.log(data);
			var venues=data.response.venues;
			// console.log(venues);
			displayStr='';//reset display Values
			displayStr=displayStr+'<h3 id="info-window">Interesting Places Around This Starbucks</h3>';
			displayStr=displayStr+'<ol id="info-list">';
			for(var i=0;i<=Math.min(venues.length, 7);i++){
				if (venues[i].hasOwnProperty("url")&&venues[i].url!=''){
				displayStr=displayStr+'<li><a href="'+venues[i].url+'">'+venues[i].name+'</a></li>';				
				}
				else{
				displayStr=displayStr+'<li>'+venues[i].name+'</li>';								
				}
			};
			displayStr=displayStr+'</ol>';
			displayStr=displayStr+'<h5 id="foursquare-credit">Powered by Foursquare</h5>';
			infowindow.setContent(displayStr);
		},
		error: function(e){
			displayStr=displayStr+'<h3 id="info-window">Sorry, there might be an error</h3>';
			displayStr=displayStr+'<img id="bad-connection" src="img/sad.jpg">';
			infowindow.setContent(displayStr);
		}
	});

}
