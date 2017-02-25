function SearchBarVM() {
	var self = this;
	//ob array stores store list
	self.storeArray = ko.observableArray(sb_data.businesses);
	//str input from filter box
	self.filterText = ko.observable("");
	//formatted filter echo
	self.formattedFilter = ko.computed(function() {
		return self.filterText() ? "Filter = " + self.filterText() : "No Filter Applied! Try: 75080, Campbell, dallas, etc.";
	});
	//filtered store list
	self.filteredArray = ko.computed(function() {
		self.fArray = new ko.observableArray();
		self.storeArray().forEach(function(item) {
			// console.log(item);	
			if (item.store_address.toLowerCase().search(self.filterText().toLowerCase()) != -1) {
				self.fArray.push(item);
			}
		});
		return self.filterText() ? self.fArray() : self.storeArray();
	});
	//count of results
	self.resultCt = ko.computed(function() {
		return "Number of Results: " + self.filteredArray().length;
	});
	//click on results pops up interaction
	self.popMarker = function(businesses) {
		// console.log(businesses);
		for (var i=0;i<markers.length;i++){
			if (businesses.id==markers[i].id){
				if (markers[i].getAnimation() !== null) {
					markers[i].setAnimation(null);
				} else {
					markers[i].setAnimation(google.maps.Animation.DROP);
				}
			}
		}
		};
	//Display details
	self.url=ko.observable();
	self.phoneNumber=ko.observable();
	self.displayAddress=ko.observable();
	self.displayDetails = function(businesses){
		self.phoneNumber("Phone Number: "+businesses.display_phone);
		self.displayAddress("Address: "+businesses.store_address);
		self.popMarker(businesses);
		//pop up the infowindow here too
		for (var i=0;i<markers.length;i++){
			if (businesses.id==markers[i].id){
				populateInfoWindow(markers[i], infowindow);
			}
		}
	};

		//apply filter
	self.applyFilter = function() {
		// make filtered ID array and reduce complexity
		var filteredID = [];
		for (var j = 0; j < self.filteredArray().length; j++) {
			filteredID.push(self.filteredArray()[j].id);
		}
		// console.log(filteredID);
		var bounds = new google.maps.LatLngBounds();
		for (var i = 0; i < markers.length; i++) {
			if (filteredID.indexOf(markers[i].id) != -1) {
				markers[i].setMap(map);
				bounds.extend(markers[i].position);
			} else {
				markers[i].setMap(null);
			}
		}
		map.fitBounds(bounds);
	};
	//Other Animations
	//pops sidebar
	self.popSideBar=function(){
		var sidebar = document.getElementById('side-bar');
		sidebar.style.display='block';
		var search = document.getElementById('toggle-menu');
		search.style.display='none';
		var title = document.getElementById('title');
		title.style.opacity=0;
	};
	//hides sidebar
	self.hideSideBar=function(){
		var sidebar = document.getElementById('side-bar');
		sidebar.style.display='none';
		var search = document.getElementById('toggle-menu');
		search.style.display='block';
		var title = document.getElementById('title');
		title.style.opacity=1;
	};
}
ko.applyBindings(new SearchBarVM());

